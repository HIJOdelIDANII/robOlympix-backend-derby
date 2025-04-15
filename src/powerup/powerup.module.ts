import { Module } from "@nestjs/common";
import { PowerupService } from "./powerup.service";
import { PowerupController } from "./powerup.controller";
import { PowerUpGateway } from "./powerup.gateway";
import { MatchModule } from "src/match/match.module";
import { MatchPowerupModule } from "src/match-powerup/match-powerup.module";

@Module({
  providers: [PowerupService, PowerUpGateway],
  controllers: [PowerupController],
  imports: [MatchModule, MatchPowerupModule],
})
export class PowerupModule {}
