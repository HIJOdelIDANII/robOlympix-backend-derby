import { IsEnum, IsDateString, IsInt, Min, IsOptional } from "class-validator";
import { MatchStatus, RoundPosition } from "../../entities/match.entity";

export class CreateMatchDto {
  @IsDateString()
  start_time: Date;

  @IsDateString()
  tend_time: Date;

  @IsEnum(RoundPosition)
  round_position: RoundPosition;

  // Optionally link this match to a tie
  @IsInt()
  tie_id: number;

  // Optional status override; defaults to "pending" if omitted
  @IsOptional()
  @IsEnum(MatchStatus)
  status?: MatchStatus;
}
