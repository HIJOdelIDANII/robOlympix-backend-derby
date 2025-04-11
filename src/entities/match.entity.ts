import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BeforeUpdate,
} from "typeorm";
import { IsEnum, IsInt, Min, IsDate, IsOptional } from "class-validator";
import { TimeStampEntity } from "./timestamp.abstract";
import { Violation } from "./violation.entity";
import { MatchPowerUp } from "./match-powerup.entity";
import { Tie } from "./tie.entity";

export enum MatchStatus {
  PENDING = "pending",
  RUNNING = "running",
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

  @Column({ type: "datetime", nullable: true })
  @IsDate()
  start_time: Date | null;

  @Column({ type: "datetime", nullable: true })
  @IsDate()
  theoretical_end_time: Date | null;

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

  // Relationship to the Tie entity (which stores team1 and team2)
  @ManyToOne(() => Tie, (tie) => tie.matches, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "tie_id" })
  tie: Tie;

  @OneToMany(() => MatchPowerUp, (mpu) => mpu.match)
  matchPowerUps: MatchPowerUp[];

  @OneToMany(() => Violation, (violation) => violation.match)
  violations: Violation[];

  // Lifecycle hook to automatically set end_time when status becomes FINISHED
  @BeforeUpdate()
  setEndTime() {
    if (this.status === MatchStatus.FINISHED && !this.end_time) {
      this.end_time = new Date();
    }
  }
}
