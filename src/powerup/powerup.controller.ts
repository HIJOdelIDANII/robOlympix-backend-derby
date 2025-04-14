import { Body, Controller, Post } from '@nestjs/common';
import { PowerUpGateway } from './powerup.gateway';

@Controller('powerup')
export class PowerupController {
    constructor(private readonly gateway: PowerUpGateway){}
    @Post()
    triggerPowerUp(@Body() payload: any) {
        console.log("PowerUp triggered from controller");
        this.gateway.server.emit('powerUpEvent', payload);
        return {success: true};
    }
}
