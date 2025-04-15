import { Module } from '@nestjs/common';
import { MatchPowerupService } from './match-powerup.service';
import { MatchPowerupController } from './match-powerup.controller';

@Module({
  providers: [MatchPowerupService],
  controllers: [MatchPowerupController]
})
export class MatchPowerupModule {}
