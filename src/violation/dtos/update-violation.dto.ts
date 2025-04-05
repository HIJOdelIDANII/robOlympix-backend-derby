import { IsEnum, IsOptional } from "class-validator";
import { ViolationType } from "../../entities/violation.entity";

export class UpdateViolationDto {
  @IsOptional()
  @IsEnum(ViolationType)
  violationType?: ViolationType;

  @IsOptional()
  matchId?: number;

  @IsOptional()
  teamId?: number;
}
