// src/match/match.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Match } from "../entities//match.entity";
import { CreateMatchDto } from "./dtos/create-match.dto";
import { UpdateMatchDto } from "./dtos/update-match.dto";
import { Team } from "../entities/team.entity";

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,

    @InjectRepository(Team)
    private teamRepository: Repository<Team>
  ) {}
  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const { team1_id, team2_id } = createMatchDto;

    // 1. Validate that team1_id is a valid team
    const team1 = await this.teamRepository.findOne({
      where: { team_id: team1_id },
    });
    if (!team1) {
      throw new NotFoundException(`Team with ID ${team1_id} not found.`);
    }

    // 2. Validate that team2_id is a valid team
    const team2 = await this.teamRepository.findOne({
      where: { team_id: team2_id },
    });
    if (!team2) {
      throw new NotFoundException(`Team with ID ${team2_id} not found.`);
    }

    // 3. Create the match entity
    const match = this.matchRepository.create({
      ...createMatchDto,
      team1,
      team2,
    });

    return this.matchRepository.save(match);
  }

  async findAll(): Promise<Match[]> {
    return this.matchRepository.find({
      relations: ["team1", "team2", "team1.participants", "team2.participants"],
    });
  }

  // READ ONE
  async findOne(id: number): Promise<Match> {
    const match = await this.matchRepository.findOne({
      where: { match_id: id },
      relations: ["team1", "team2", "team1.participants", "team2.participants"],
    });
    if (!match) {
      throw new NotFoundException(`Match with ID ${id} not found.`);
    }
    return match;
  }

  async update(id: number, updateMatchDto: UpdateMatchDto): Promise<Match> {
    const { team1_id, team2_id } = updateMatchDto;

    // 1. If user wants to change team1, validate it
    let team1: Team | undefined = undefined;
    if (team1_id !== undefined) {
      const foundTeam1 = await this.teamRepository.findOne({
        where: { team_id: team1_id },
      });
      if (!foundTeam1) {
        throw new NotFoundException(`Team with ID ${team1_id} not found.`);
      }
      team1 = foundTeam1!; // non-null assertion
    }

    // 2. If user wants to change team2, validate it
    let team2: Team | undefined = undefined;
    if (team2_id !== undefined) {
      const foundTeam2 = await this.teamRepository.findOne({
        where: { team_id: team2_id },
      });
      if (!foundTeam2) {
        throw new NotFoundException(`Team with ID ${team2_id} not found.`);
      }
      team2 = foundTeam2!; // non-null assertion
    }

    // 3. Update match record
    await this.matchRepository.update(id, {
      ...updateMatchDto,
      team1: team1_id !== undefined ? team1 : undefined,
      team2: team2_id !== undefined ? team2 : undefined,
    });

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.matchRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Match with ID ${id} not found.`);
    }
  }
}
