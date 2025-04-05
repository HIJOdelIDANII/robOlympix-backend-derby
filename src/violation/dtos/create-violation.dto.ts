import { IsEnum, IsInt, IsOptional } from "class-validator";
import { ViolationType } from "../../entities/violation.entity";

export class CreateViolationDto {
  @IsEnum(ViolationType)
  violationType: ViolationType;

  @IsInt()
  matchId: number;

  // Optional, if the violation is associated with a specific team
  @IsOptional()
  @IsInt()
  teamId?: number;
}
