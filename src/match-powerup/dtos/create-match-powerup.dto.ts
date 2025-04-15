import { IsInt, IsOptional, IsBoolean, IsDate, IsString } from "class-validator";

export class CreateMatchPowerUpDto {
  @IsInt()
  matchId: number;

  @IsString()
  powerupColor: string;

  @IsOptional()
  @IsInt()
  activatedByTeamId: number;

  @IsOptional()
  @IsDate()
  activationTime: Date;

  @IsBoolean()
  isActive: boolean;
}
