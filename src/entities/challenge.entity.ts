import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IsNotEmpty, IsString, IsJSON, IsOptional } from "class-validator";
import { TimeStampEntity } from "./timestamp.abstract";
import { Match } from "./match.entity";
import { Bracket } from "./bracket.entity";
import { Team } from "./team.entity";

@Entity({ name: "challenges" })
export class Challenge extends TimeStampEntity{
  @PrimaryGeneratedColumn()
  challenge_id: number;

  @Column({ type: "varchar", length: 50 })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ type: "json", nullable: true })
  @IsOptional()
  @IsJSON()
  settings: any;

  @OneToMany(()=>Match, (match)=> match.challenge)
  matches: Match[];

  @OneToMany(()=>Bracket, (bracket)=> bracket.challenge)
  brackets: Bracket[];

  @OneToMany(()=>Team, (team)=> team.challenge)
  teams: Team[];
}
