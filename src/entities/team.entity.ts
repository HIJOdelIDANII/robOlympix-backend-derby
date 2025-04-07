import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { IsString, Length } from "class-validator";
import { TimeStampEntity } from "./timestamp.abstract";
import { Participant } from "./participant.entity";
import { Tie } from "./tie.entity";

@Entity({ name: "teams" })
export class Team extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  team_id: number;

  @Column({ type: "varchar", length: 50, unique: true })
  @IsString()
  @Length(1, 50)
  team_name: string;

  @OneToMany(() => Participant, (participant) => participant.team)
  participants: Participant[];

  // Ties where this team is assigned as team1 (home side)
  @OneToMany(() => Tie, (tie) => tie.team1)
  homeTies: Tie[];

  // Ties where this team is assigned as team2 (away side)
  @OneToMany(() => Tie, (tie) => tie.team2)
  awayTies: Tie[];
}
