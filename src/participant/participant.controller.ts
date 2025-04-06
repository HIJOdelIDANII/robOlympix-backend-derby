// src/participant/participant.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { ParticipantService } from "./participant.service";
import { CreateParticipantDto } from "./dtos/create-participant.dto";
import { UpdateParticipantDto } from "./dtos/update-participant.dto";
import { Participant } from "../entities/participant.entity";

@Controller("participants")
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  async create(
    @Body() createParticipantDto: CreateParticipantDto
  ): Promise<Participant> {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  async findAll(): Promise<Participant[]> {
    return this.participantService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Participant> {
    return this.participantService.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateParticipantDto: UpdateParticipantDto
  ): Promise<Participant> {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.participantService.remove(id);
  }
}
