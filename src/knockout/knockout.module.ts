import { Module } from '@nestjs/common';
import { KnockoutService } from './knockout.service';
import { KnockoutController } from './knockout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from 'src/entities/match.entity';
import { Team } from 'src/entities/team.entity';
import { Tie } from 'src/entities/tie.entity';

@Module({
  providers: [KnockoutService],
  controllers: [KnockoutController],
  imports: [TypeOrmModule.forFeature([Team, Match, Tie])],
})
export class KnockoutModule {}
