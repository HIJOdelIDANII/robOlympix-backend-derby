import { Controller, Patch, Param, Body, Get } from "@nestjs/common";
import { MatchService } from "./match.service";
import { MatchStatus } from "src/entities/match.entity";
import { instanceToPlain } from "class-transformer";

@Controller("matches")
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Patch(":id/score")
  async updateMatchScore(
    @Param("id") id: string,
    @Body("score_team1") scoreTeam1: number,
    @Body("score_team2") scoreTeam2: number
  ) {
    const updatedMatch = await this.matchService.updateMatchScore(
      +id,
      scoreTeam1,
      scoreTeam2
    );
    return {
      message: "Match score updated successfully",
      match: instanceToPlain(updatedMatch),
    };
  }
  @Patch(":id/status")
  async updateMatchStatus(
    @Param("id") id: string,
    @Body("status") status: MatchStatus
  ) {
    await this.matchService.updateMatchStatus(+id, status);
    return {
      message: "status updated",
      status,
    };
  }
  @Get(":id/status")
  async getMatchStatus(@Param("id") id: string) {
    const status = await this.matchService.getMatchStatus(+id);
    return { status };
  }
}
