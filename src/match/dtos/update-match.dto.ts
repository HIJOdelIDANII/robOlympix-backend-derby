import { IsEnum, IsDate, IsInt, Min, IsOptional } from 'class-validator';
import { MatchStatus, RoundPosition, KnockoutStage } from '../../entities/match.entity';

export class UpdateMatchDto {
  @IsOptional()
  @IsEnum(KnockoutStage)
  knockout_stage?: KnockoutStage;

  @IsOptional()
  @IsDate()
  start_time?: Date;

  @IsOptional()
  @IsDate()
  tend_time?: Date;

  @IsOptional()
  @IsDate()
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

  @IsOptional()
  @IsInt()
  challengeId?: number;

  @IsOptional()
  @IsInt()
  team1_id?: number;

  @IsOptional()
  @IsInt()
  team2_id?: number;
}
