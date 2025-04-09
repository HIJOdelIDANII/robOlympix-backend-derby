import { Module } from "@nestjs/common";
import { MatchService } from "./match.service";
import { MatchController } from "./match.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Team } from "src/entities/team.entity";
import { Match } from "src/entities/match.entity";
import { Tie } from "src/entities/tie.entity";

@Module({
  providers: [MatchService],
  controllers: [MatchController],
  imports: [TypeOrmModule.forFeature([Tie, Team, Match])],
})
export class MatchModule {}
