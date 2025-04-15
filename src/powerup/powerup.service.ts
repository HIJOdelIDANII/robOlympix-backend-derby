import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { MatchPowerUp } from "src/entities/match-powerup.entity";
import { MatchStatus } from "src/entities/match.entity";
import { CreateMatchPowerUpDto } from "src/match-powerup/dtos/create-match-powerup.dto";
import { MatchPowerupService } from "src/match-powerup/match-powerup.service";
import { MatchService } from "src/match/match.service";

@Injectable()
export class PowerupService {
  constructor(
    private readonly matchService: MatchService,
    private readonly matchPowerupService: MatchPowerupService
  ) {}

  async savePowerUps(teamId: number, color: string): Promise<MatchPowerUp> {
    const matchesByStatus = await this.matchService.getMatchByStatus(
      MatchStatus.RUNNING
    );
    let match;
    if (matchesByStatus.length === 1) {
      match = matchesByStatus[0];
    } else {
      throw new HttpException(
        `Expected one match with status "running", found ${matchesByStatus.length}`,
        HttpStatus.CONFLICT // 409 Conflict
      );
    }
    const currentDate = new Date();
    const matchPowerUpDto: CreateMatchPowerUpDto = {
      matchId: match.match_id,
      powerupColor: color,
      activatedByTeamId: teamId,
      activationTime: currentDate,
      isActive: true,
    };
    const matchPowerUp =
      await this.matchPowerupService.createMatchPowerUp(matchPowerUpDto);
    return matchPowerUp;
  }
}
