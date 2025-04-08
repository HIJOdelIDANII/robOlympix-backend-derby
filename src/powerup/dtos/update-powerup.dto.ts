import { IsString, Length, IsOptional, IsEnum } from "class-validator";
import { Effect } from "src/entities/powerup.entity";

export class UpdatePowerUpDto {
  @IsOptional()
  @IsString()
  @Length(1, 15)
  name?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsEnum(Effect)
  effect?: Effect;
}
