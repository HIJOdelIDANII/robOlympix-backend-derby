import { IsInt, Min, IsOptional, IsEnum } from 'class-validator';
import { MatchStatus } from '../../entities/match.entity';

export class UpdateTieDto {
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

  @IsOptional()
  @IsEnum(MatchStatus)
  status?: MatchStatus;
}
