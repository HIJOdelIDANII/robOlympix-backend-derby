import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMatchPowerUpDto } from "./dtos/create-match-powerup.dto";
import { MatchService } from "src/match/match.service";
import { InjectRepository } from "@nestjs/typeorm";
import { PowerUp } from "src/entities/powerup.entity";
import { Repository } from "typeorm";
import { TeamService } from "src/team/team.service";
import { MatchPowerUp } from "src/entities/match-powerup.entity";

@Injectable()
export class MatchPowerupService {
  constructor(
    private readonly matchServie: MatchService,
    private readonly teamService: TeamService,
    @InjectRepository(PowerUp)
    private readonly powerUpRepository: Repository<PowerUp>,
    @InjectRepository(MatchPowerUp)
    private readonly matchPowerUpRepository: Repository<MatchPowerUp>
  ) {}
  async createMatchPower(
    createMatchPowerUp: CreateMatchPowerUpDto
  ): Promise<MatchPowerUp> {
    const match = await this.matchServie.findMatchById(
      createMatchPowerUp.matchId
    );
    const powerup = await this.powerUpRepository.findOne({
      where: { color: createMatchPowerUp.powerupColor },
    });
    if (!powerup) {
        throw new NotFoundException(
          `PowerUp with color ${createMatchPowerUp.powerupColor} not found`
        );
      }
    const activatedByTeam = await this.teamService.findOne(
      createMatchPowerUp.activatedByTeamId
    );
    const matchPowerUp = this.matchPowerUpRepository.create({
      match,
      powerup,
      activatedByTeam,
      activationTime: createMatchPowerUp.activationTime,
      isActive: createMatchPowerUp.isActive,
    });

    return await this.matchPowerUpRepository.save(matchPowerUp);
  }
}
