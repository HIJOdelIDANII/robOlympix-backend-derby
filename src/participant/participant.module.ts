import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { Participant } from 'src/entities/participant.entity';
import { Team } from 'src/entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ParticipantService],
  controllers: [ParticipantController],
  imports: [TypeOrmModule.forFeature([Team, Participant])]

})
export class ParticipantModule {}
