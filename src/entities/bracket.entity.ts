import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { IsEnum } from "class-validator";
import { Challenge } from "./challenge.entity";
import { Match } from "./match.entity";

// Example numeric enum for bracket positions
export enum BracketPosition {
  ROUND_OF_16 = 16,
  ROUND_OF_8 = 8,
  ROUND_OF_4 = 4,
  ROUND_OF_2 = 2,
  ROUND_OF_1 = 1,
}

@Entity({ name: "brackets" })
export class Bracket {
  @PrimaryGeneratedColumn()
  bracket_id: number;

  @Column({
    type: "enum",
    enum: BracketPosition,
  })
  @IsEnum(BracketPosition)
  bracket_position: BracketPosition;

  @ManyToOne(() => Challenge, (challenge) => challenge.brackets)
  challenge: Challenge;

  @OneToMany(() => Match, (match) => match.bracket)
  matches: Match[];
}
