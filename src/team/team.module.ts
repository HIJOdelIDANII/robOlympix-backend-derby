import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/entities/team.entity';

@Module({
  providers: [TeamService],
  controllers: [TeamController],
  imports: [TypeOrmModule.forFeature([Team])],
  exports: [TeamService]
})
export class TeamModule {}
