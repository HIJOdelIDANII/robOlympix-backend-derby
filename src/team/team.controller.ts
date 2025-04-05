// src/team/team.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { TeamService } from "./team.service";
import { CreateTeamDto } from "./dtos/create-team.dto";
import { UpdateTeamDto } from "./dtos/update-team.dto";
import { Team } from "../entities/team.entity";

@Controller("teams")
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamService.create(createTeamDto);
  }

  @Get()
  async findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<Team> {
    return this.teamService.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() updateTeamDto: UpdateTeamDto
  ): Promise<Team> {
    return this.teamService.update(id, updateTeamDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    return this.teamService.remove(id);
  }
}
