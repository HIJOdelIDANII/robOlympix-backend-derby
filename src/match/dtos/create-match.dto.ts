import { IsEnum, IsDate, IsInt, Min } from 'class-validator';
import { MatchStatus, RoundPosition, KnockoutStage } from '../../entities/match.entity';

export class CreateMatchDto {
  @IsEnum(KnockoutStage)
  knockout_stage: KnockoutStage;

  @IsDate()
  start_time: Date;

  @IsDate()
  tend_time: Date;

  @IsEnum(MatchStatus)
  status: MatchStatus;

  @IsEnum(RoundPosition)
  round_position: RoundPosition;

  @IsInt()
  @Min(0)
  score_team1: number;

  @IsInt()
  @Min(0)
  score_team2: number;

  @IsInt()
  challengeId: number;

  @IsInt()
  team1_id: number;

  @IsInt()
  team2_id: number;
}
