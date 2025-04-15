import { Module } from '@nestjs/common';
import { PowerupService } from './powerup.service';
import { PowerupController } from './powerup.controller';
import { PowerUpGateway } from './powerup.gateway';
import { MatchModule } from 'src/match/match.module';

@Module({
  providers: [PowerupService, PowerUpGateway],
  controllers: [PowerupController],
  imports:[MatchModule]
})
export class PowerupModule {}
