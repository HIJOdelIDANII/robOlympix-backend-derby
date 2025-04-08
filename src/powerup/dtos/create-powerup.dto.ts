import { IsEnum, IsString, Length } from "class-validator";
import { Effect } from "src/entities/powerup.entity";

export class CreatePowerUpDto {
  @IsString()
  @Length(1, 15)
  name: string;

  @IsString()
  color: string;

  @IsEnum(Effect)
  effect: Effect;
}
