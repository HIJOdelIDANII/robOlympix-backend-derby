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

  @Post("create")
  async create(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return await this.teamService.create(createTeamDto);
  }

  @Get()
  async findAll() {
    return await this.teamService.findAll();
  }

  @Get("name/:name")
  async findByName(@Param("name") name: string) {
    return await this.teamService.findByName(name);
  }
  @Get(":id")
  async findOne(@Param("id") id: number){
    return await this.teamService.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() updateTeamDto: UpdateTeamDto
  ){
    return await this.teamService.update(id, updateTeamDto);
  }
  @Put(":name")
  async updateByName(
    @Param("name") name: string,
    @Body() updateTeamDto: UpdateTeamDto
  ){
    return await this.teamService.updateByName(name, updateTeamDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: number){
    return await this.teamService.remove(id);
  }
  @Delete("delete/name/:name")
  async removeByName(@Param("name") name: string){
    return await this.teamService.removeByName(name);
  }
}
