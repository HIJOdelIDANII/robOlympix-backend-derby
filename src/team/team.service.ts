import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Team } from "src/entities/team.entity";
import { Repository } from "typeorm";
import { CreateTeamDto } from "./dtos/create-team.dto";
import { UpdateTeamDto } from "./dtos/update-team.dto";
import { instanceToPlain } from "class-transformer";

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>
  ) {}
  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    //checks if a team with the same name already exists
    const existingTeam = await this.teamRepository.findOne({
      where: { team_name: createTeamDto.team_name },
    });
    if (existingTeam) {
      throw new ConflictException("A team with that name already exists.");
    }
    const team = this.teamRepository.create(createTeamDto);
    return this.teamRepository.save(team);
  }
  async findAll(){
    return instanceToPlain(this.teamRepository.find());
  }

  async findOne(id: number){
    const team = await this.teamRepository.findOne({ where: { team_id: id } });
    if (!team) {
      throw new NotFoundException(`Team with id ${id} not found.`);
    }
    return instanceToPlain(team);
  }
  async findByName(name: string) {
    const team = await this.teamRepository.findOne({
      where: { team_name: name },
    });
    if (!team) {
      throw new NotFoundException(`Team with name "${name}" not found`);
    }
    return instanceToPlain(team);
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    // optionally check for team name uniqueness if it's being updated
    if (updateTeamDto.team_name) {
      const teamWithSameName = await this.teamRepository.findOne({
        where: { team_name: updateTeamDto.team_name },
      });
      if (teamWithSameName && teamWithSameName.team_id !== id) {
        throw new ConflictException("A team with that name already exists.");
      }
    }
    await this.teamRepository.update(id, updateTeamDto);
    return this.findOne(id);
  }
  async updateByName(
    name: string,
    updateTeamDto: UpdateTeamDto
  ){
    // Find team by name first
    const team = await this.teamRepository.findOne({
      where: { team_name: name },
    });
    if (!team) {
      throw new NotFoundException(`Team with name "${name}" not found.`);
    }
    // If team_name is updated, check for conflicts
    if (updateTeamDto.team_name && updateTeamDto.team_name !== name) {
      const teamWithSameName = await this.teamRepository.findOne({
        where: { team_name: updateTeamDto.team_name },
      });
      if (teamWithSameName && teamWithSameName.team_id !== team.team_id) {
        throw new ConflictException("A team with that name already exists.");
      }
    }
    await this.teamRepository.update(team.team_id, updateTeamDto);
    return this.findOne(team.team_id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.teamRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Team with id ${id} not found.`);
    }
  }
  async removeByName(name: string): Promise<void> {
    const result = await this.teamRepository.delete({ team_name: name });
    if (result.affected === 0) {
      throw new NotFoundException(`Team with name "${name}" not found.`);
    }
  }
}
