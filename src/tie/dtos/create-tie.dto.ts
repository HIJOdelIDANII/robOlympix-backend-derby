import { IsEnum, IsInt, Min, IsOptional } from "class-validator";
import { KnockoutStage } from "../../entities/tie.entity";
import { MatchStatus } from "../../entities/match.entity";

export class CreateTieDto {
  @IsEnum(KnockoutStage)
  knockout_stage: KnockoutStage;

  @IsInt()
  team1_id: number;

  @IsInt()
  team2_id: number;

  // Optionally, you can include initial cumulative scores if needed (defaults to 0 in the entity)
  @IsOptional()
  @IsInt()
  @Min(0)
  cumulativeScoreTeam1?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  cumulativeScoreTeam2?: number;

  // Optionally, you can set an initial status (defaults to PENDING)
  @IsOptional()
  @IsEnum(MatchStatus)
  status?: MatchStatus;
}
