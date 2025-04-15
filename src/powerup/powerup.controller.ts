import { Body, Controller, Post, HttpException, HttpStatus } from "@nestjs/common";
import { PowerUpGateway } from "./powerup.gateway";
import { PowerupService } from "./powerup.service";

@Controller("powerup")
export class PowerupController {
  constructor(
    private readonly gateway: PowerUpGateway,
    private readonly powerupService: PowerupService
  ) {}

  @Post()
  async triggerPowerUp(@Body() payload: any) {
    try {
      console.log("PowerUp triggered from controller");
      const { team, color } = payload;
      
      if (!team || !color) {
        throw new HttpException(
          'Missing required fields: team and color',
          HttpStatus.BAD_REQUEST
        );
      }

      const matchPowerUp = await this.powerupService.savePowerUps(team, color);
      this.gateway.server.emit("powerUpEvent", payload);

      return {
        message: "PowerUp triggered successfully",
      };
    } catch (error) {
      
      if (error instanceof HttpException) {
        throw error; 
      }

      
      if (error.name === 'EntityNotFound') {
        throw new HttpException(
          `Resource not found: ${error.message}`,
          HttpStatus.NOT_FOUND
        );
      }

      
      if (error.name === 'QueryFailedError') {
        throw new HttpException(
          `Invalid request: ${error.message}`,
          HttpStatus.BAD_REQUEST
        );
      }

      
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}