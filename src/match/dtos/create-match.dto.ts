import { IsEnum, IsDate, IsInt, Min } from "class-validator";
import {
  MatchStatus,
  RoundPosition,
  KnockoutStage,
} from "../../entities/match.entity";

export class CreateMatchDto {
  @IsEnum(KnockoutStage)
  knockout_stage: KnockoutStage;

  @IsDate()
  start_time: Date;

  @IsDate()
  tend_time: Date;

  @IsEnum(MatchStatus)
  status?: MatchStatus;

  @IsEnum(RoundPosition)
  round_position: RoundPosition;

  @IsInt()
  team1_id: number;

  @IsInt()
  team2_id: number;
}
