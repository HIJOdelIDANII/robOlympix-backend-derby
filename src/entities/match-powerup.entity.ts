import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import { Match } from "./match.entity";
import { PowerUp } from "./powerup.entity";
import { Team } from "./team.entity";

@Entity({ name: "match_power_ups" })
export class MatchPowerUp extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Match, (match) => match.matchPowerUps, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "match_id" })
  match: Match;

  @ManyToOne(() => PowerUp, (powerup) => powerup.matchPowerUps, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "powerup_id" })
  powerup: PowerUp;

  @ManyToOne(() => Team, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "activated_by_team_id" })
  activatedByTeam?: Team;

  @Column({ type: "datetime", nullable: true })
  activationTime?: Date;

  @Column({ type: "boolean", default: false })
  isActive: boolean; //if true the team has the power up activated
}
