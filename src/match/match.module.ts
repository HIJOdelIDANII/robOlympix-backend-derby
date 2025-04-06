import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/entities/team.entity';
import { Match } from 'src/entities/match.entity';

@Module({
  providers: [MatchService],
  controllers: [MatchController],
  imports: [TypeOrmModule.forFeature([Team, Match])]
})
export class MatchModule {}
