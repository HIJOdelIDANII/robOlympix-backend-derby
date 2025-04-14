import { Module } from '@nestjs/common';
import { PowerupService } from './powerup.service';
import { PowerupController } from './powerup.controller';
import { PowerUpGateway } from './powerup.gateway';

@Module({
  providers: [PowerupService, PowerUpGateway],
  controllers: [PowerupController]
})
export class PowerupModule {}
