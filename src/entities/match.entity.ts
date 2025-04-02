import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { IsEnum, IsInt, Min, IsDate, IsOptional } from "class-validator";
import { TimeStampEntity } from "./timestamp.abstract";
import { Challenge } from "./challenge.entity";
import { Team } from "./team.entity";
import { Bracket } from "./bracket.entity";

export enum MatchStatus {
  PENDING = "pending",
  RUNNING = "running",
  PAUSED = "paused",
  FINISHED = "finished",
}
export enum RoundPosition {
  FIRST_GAME = 1,
  SECOND_GAME = 2,
}
@Entity({ name: "matches" })
export class Match extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  match_id: number;

  @Column({ type: "datetime" })
  @IsDate()
  start_time: Date;

  @Column({ type: "datetime", nullable: true })
  @IsOptional()
  @IsDate()
  end_time?: Date;

  @Column({
    type: "enum",
    enum: MatchStatus,
    default: MatchStatus.PENDING,
  })
  @IsEnum(MatchStatus)
  status: MatchStatus;

  @Column({
    type: "enum",
    enum: RoundPosition,
  })
  @IsEnum(RoundPosition)
  round_position: RoundPosition;

  @Column({ type: "int", default: 0 })
  @IsInt()
  @Min(0)
  score_team1: number;

  @Column({ type: "int", default: 0 })
  @IsInt()
  @Min(0)
  score_team2: number;

  @ManyToOne(() => Challenge, (challenge) => challenge.matches)
  challenge: Challenge;

  @ManyToOne(() => Bracket, (bracket) => bracket.matches)
  @JoinColumn({ name: "bracket_id" })
  bracket: Bracket;

  // Reference to team playing as team1
  @ManyToOne(() => Team, (team) => team.team1Matches, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "team1_id" })
  team1: Team;

  // Reference to team playing as team2
  @ManyToOne(() => Team, (team) => team.team2Matches, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "team2_id" })
  team2: Team;
  /*
    haja mouhema !!
    onDelete: "SET NULL" :this way, if a team is deleted, the corresponding foreign key in the match record is automatically set to null, leaving the match intact.
  */
}
