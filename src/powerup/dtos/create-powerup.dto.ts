import { IsEnum, IsString, Length } from "class-validator";
import { Description } from "src/entities/powerup.entity";

export class CreatePowerUpDto {
  @IsString()
  @Length(1, 50)
  name: string;

  @IsString()
  color: string;

  @IsEnum(Description)
  description: Description;
}
