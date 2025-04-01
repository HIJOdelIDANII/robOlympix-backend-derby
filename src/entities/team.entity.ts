import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { IsString, Length } from "class-validator";
import { TimeStampEntity } from "./timestamp.abstract";
import { Challenge } from "./challenge.entity";
import { Match } from "./match.entity";
import { Participant } from "./participant.entity";

@Entity({ name: "teams" })
export class Team extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  team_id: number;

  @Column({ type: "varchar", length: 50 })
  @IsString()
  @Length(1, 50)
  team_name: string;

  @ManyToOne(() => Challenge, (challenge) => challenge.teams)
  challenge: Challenge;


  @OneToMany(() => Participant, participant => participant.team)
  participants: Participant[];

  // Matches where this team is assigned as team1
  @OneToMany(() => Match, (match) => match.team1)
  team1Matches: Match[];

  // Matches where this team is assigned as team2
  @OneToMany(() => Match, (match) => match.team2)
  team2Matches: Match[];


}
