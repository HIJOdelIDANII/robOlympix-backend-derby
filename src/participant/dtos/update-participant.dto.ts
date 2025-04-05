import { IsString, Length, IsEnum, IsOptional } from "class-validator";
import { ParticipantStatus } from "../../entities/participant.entity";

export class UpdateParticipantDto {
  @IsOptional()
  @IsString()
  @Length(3, 50)
  username?: string;

  @IsOptional()
  @IsString()
  @Length(5, 60)
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  family_name?: string;

  @IsOptional()
  @IsEnum(ParticipantStatus)
  status?: ParticipantStatus;

  @IsOptional()
  teamId?: number;
}
