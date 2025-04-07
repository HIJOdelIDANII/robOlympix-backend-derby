import { IsEnum, IsDateString, IsInt, Min, IsOptional } from "class-validator";
import { MatchStatus, RoundPosition } from "../../entities/match.entity";

export class UpdateMatchDto {
  @IsOptional()
  @IsDateString()
  start_time?: Date;

  @IsOptional()
  @IsDateString()
  tend_time?: Date;

  @IsOptional()
  @IsDateString()
  end_time?: Date;

  @IsOptional()
  @IsEnum(MatchStatus)
  status?: MatchStatus;

  @IsOptional()
  @IsEnum(RoundPosition)
  round_position?: RoundPosition;

  @IsOptional()
  @IsInt()
  @Min(0)
  score_team1?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  score_team2?: number;

  // Allow updating the associated tie if needed
  @IsOptional()
  @IsInt()
  tie_id?: number;
}
