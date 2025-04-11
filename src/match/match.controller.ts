import { Controller, Patch, Param, Body } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Patch(':id/score')
  async updateMatchScore(
    @Param('id') id: string,
    @Body('score_team1') scoreTeam1: number,
    @Body('score_team2') scoreTeam2: number,
  ) {
    const updatedMatch = await this.matchService.updateMatchScore(
      +id,
      scoreTeam1,
      scoreTeam2,
    );
    return {
      message: 'Match score updated successfully',
      match: updatedMatch,
    };
  }
}
