import { IsEnum, IsInt, Min, IsOptional } from "class-validator";
import { KnockoutStage } from "../../entities/tie.entity";

export class UpdateTieDto {
  @IsOptional()
  @IsEnum(KnockoutStage)
  knockout_stage?: KnockoutStage;

  @IsOptional()
  @IsInt()
  team1_id?: number;

  @IsOptional()
  @IsInt()
  team2_id?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  cumulativeScoreTeam1?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  cumulativeScoreTeam2?: number;
}
