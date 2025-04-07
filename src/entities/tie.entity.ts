import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { IsEnum, IsInt, Min } from "class-validator";
import { TimeStampEntity } from "./timestamp.abstract";
import { Team } from "./team.entity";
import { Match } from "./match.entity";
import { MatchStatus } from "./match.entity";

export enum KnockoutStage {
  RoundOf16 = "Round of 16",
  QuarterFinals = "Quarter Finals",
  SemiFinals = "Semi Finals",
  Finals = "Finals",
}

@Entity({ name: "ties" })
export class Tie extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  tie_id: number;

  @Column({
    type: "enum",
    enum: KnockoutStage,
  })
  @IsEnum(KnockoutStage)
  knockout_stage: KnockoutStage;

  // Reference to the first team (team1)
  @ManyToOne(() => Team, (team) => team.homeTies, { nullable: false })
  @JoinColumn({ name: "team1_id" })
  team1: Team;

  // Reference to the second team (team2)
  @ManyToOne(() => Team, (team) => team.awayTies, { nullable: false })
  @JoinColumn({ name: "team2_id" })
  team2: Team;

  // A tie groups two match legs
  @OneToMany(() => Match, (match) => match.tie, { cascade: true })
  matches: Match[];

  // Cumulative scores for the tie (could be updated after both matches finish)
  @Column({ type: "int", default: 0 })
  @IsInt()
  @Min(0)
  cumulativeScoreTeam1: number;

  @Column({ type: "int", default: 0 })
  @IsInt()
  @Min(0)
  cumulativeScoreTeam2: number;

  // Overall status of the tie (using the same MatchStatus enum)
  @Column({
    type: "enum",
    enum: MatchStatus,
    default: MatchStatus.PENDING,
  })
  @IsEnum(MatchStatus)
  status: MatchStatus;
}
