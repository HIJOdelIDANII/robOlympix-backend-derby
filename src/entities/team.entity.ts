import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { IsString, Length } from "class-validator";
import { TimeStampEntity } from "./timestamp.abstract";
import { Challenge } from "./challenge.entity";

@Entity({ name: "teams" })
export class Team extends TimeStampEntity{
  @PrimaryGeneratedColumn()
  team_id: number;

  @Column({ type: "varchar", length: 50 })
  @IsString()
  @Length(1, 50)
  team_name: string;

  @ManyToOne(()=> Challenge,(challenge) => challenge.teams )
  challenge: Challenge;
}