import { IsInt, IsOptional, IsBoolean, IsDate } from "class-validator";

export class UpdateMatchPowerUpDto {
  @IsOptional()
  @IsInt()
  matchId?: number;

  @IsOptional()
  @IsInt()
  powerupId?: number;

  @IsOptional()
  @IsInt()
  activatedByTeamId?: number;

  @IsOptional()
  @IsDate()
  activationTime?: Date;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
