import { IsString, Length, IsEnum } from 'class-validator';
import { ParticipantStatus } from '../../entities/participant.entity';

export class CreateParticipantDto {
  @IsString()
  @Length(3, 50)
  username: string;

  @IsString()
  name: string;

  @IsString()
  family_name: string;

  @IsEnum(ParticipantStatus)
  status: ParticipantStatus;

  teamId: number;
}
