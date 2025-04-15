import { Module } from "@nestjs/common";
import { MatchPowerupService } from "./match-powerup.service";
import { MatchPowerupController } from "./match-powerup.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchModule } from "src/match/match.module";
import { PowerUp } from "src/entities/powerup.entity";
import { TeamModule } from "src/team/team.module";
import { MatchPowerUp } from "src/entities/match-powerup.entity";

@Module({
  providers: [MatchPowerupService],
  controllers: [MatchPowerupController],
  exports: [MatchPowerupService],
  imports: [TypeOrmModule.forFeature([PowerUp,MatchPowerUp]),
  MatchModule, TeamModule],
})
export class MatchPowerupModule {}
