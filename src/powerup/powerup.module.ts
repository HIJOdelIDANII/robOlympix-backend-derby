import { Module } from '@nestjs/common';
import { PowerupService } from './powerup.service';
import { PowerupController } from './powerup.controller';

@Module({
  providers: [PowerupService],
  controllers: [PowerupController]
})
export class PowerupModule {}
