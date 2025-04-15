import { Injectable } from '@nestjs/common';
import { MatchStatus } from 'src/entities/match.entity';
import { CreateMatchPowerUpDto } from 'src/match-powerup/dtos/create-match-powerup.dto';
import { MatchService } from 'src/match/match.service';

@Injectable()
export class PowerupService {
    constructor(private readonly matchService: MatchService){}

    async savePowerUps(teamId: number, color: string) {
        const matchesByStatus = await this.matchService.getMatchByStatus(MatchStatus.RUNNING);
        let match;
        if (matchesByStatus.length === 1){
            match = matchesByStatus[0];
        }else{
            throw new Error(`Expected one match with status --running--, found ${match.length}`);
        }
        const currentDate = new Date();
        const matchPowerUp: CreateMatchPowerUpDto = {
            matchId: match.match_id,
            powerupColor: color,
            activatedByTeamId: teamId,
            activationTime: currentDate,
            isActive: true
        }
    }
}
