// src/participant/participant.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Participant } from "../entities/participant.entity";
import { CreateParticipantDto } from "./dtos/create-participant.dto";
import { UpdateParticipantDto } from "./dtos/update-participant.dto";
import { Team } from "../entities/team.entity";

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>
  ) {}

  async create(
    createParticipantDto: CreateParticipantDto
  ): Promise<Participant> {
    const { email, teamId } = createParticipantDto;

    // Check if email is already in use
    const existing = await this.participantRepository.findOne({
      where: { email },
    });
    if (existing) {
      throw new ConflictException("This email is already registered.");
    }

    // Validate that the provided team exists
    const team = await this.teamRepository.findOne({
      where: { team_id: teamId },
    });
    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found.`);
    }

    // Create a new participant and assign the team
    const participant = this.participantRepository.create({
      ...createParticipantDto,
      team,
    });

    return this.participantRepository.save(participant);
  }

  // GET all participants with their team data
  async findAll(): Promise<Participant[]> {
    return this.participantRepository.find({
      relations: ["team"],
    });
  }

  // GET one participant by ID with its team data
  async findOne(id: number): Promise<Participant> {
    const participant = await this.participantRepository.findOne({
      where: { user_id: id },
      relations: ["team"],
    });
    if (!participant) {
      throw new NotFoundException(`Participant with ID ${id} not found.`);
    }
    return participant;
  }

  async update(
    id: number,
    updateParticipantDto: UpdateParticipantDto
  ): Promise<Participant> {
    const { email, teamId } = updateParticipantDto;

    // Check for email uniqueness if updating email
    if (email) {
      const existing = await this.participantRepository.findOne({
        where: { email },
      });
      if (existing && existing.user_id !== id) {
        throw new ConflictException("Email is already taken.");
      }
    }

    // If a new team is provided, validate that it exists
    let team: Team | undefined;
    if (teamId !== undefined) {
      const foundTeam = await this.teamRepository.findOne({
        where: { team_id: teamId },
      });
      if (!team) {
        throw new NotFoundException(`Team with ID ${teamId} not found.`);
      }
      team = foundTeam!;
    }

    await this.participantRepository.update(id, {
      ...updateParticipantDto,
      team: teamId !== undefined ? team : undefined,
    });

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.participantRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Participant with ID ${id} not found.`);
    }
  }
}
