import { IsInt, IsOptional, IsBoolean, IsDate } from "class-validator";

export class CreateMatchPowerUpDto {
  @IsInt()
  matchId: number;

  @IsInt()
  powerupId: number;

  @IsOptional()
  @IsInt()
  activatedByTeamId: number;

  @IsOptional()
  @IsDate()
  activationTime: Date;

  @IsBoolean()
  isActive: boolean;
}
