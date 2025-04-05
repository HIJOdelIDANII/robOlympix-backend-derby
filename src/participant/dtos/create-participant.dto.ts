import { IsString, Length, IsEnum, IsNotEmpty } from 'class-validator';
import { ParticipantStatus } from '../../entities/participant.entity';

export class CreateParticipantDto {
  @IsString()
  @Length(3, 50)
  username: string;

  @IsString()
  @Length(5,60)
  email: string;

  @IsString()
  name: string;

  @IsString()
  family_name: string;

  @IsEnum(ParticipantStatus)
  status: ParticipantStatus;

  teamId: number;
}
