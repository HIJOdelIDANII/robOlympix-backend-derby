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
import { MatchService } from "./match.service";
import { CreateMatchDto } from "./dtos/create-match.dto";
import { UpdateMatchDto } from "./dtos/update-match.dto";
import { Match } from "../entities/match.entity";

@Controller("matches")
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post("create")
  async create(@Body() createMatchDto: CreateMatchDto): Promise<Match> {
    return this.matchService.create(createMatchDto);
  }

  @Get()
  async findAll(): Promise<Match[]> {
    return this.matchService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Match> {
    return this.matchService.findOne(id);
  }

  @Put("update/:id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateMatchDto: UpdateMatchDto
  ): Promise<Match> {
    return this.matchService.update(id, updateMatchDto);
  }

  @Delete("delete/:id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.matchService.remove(id);
  }
}
