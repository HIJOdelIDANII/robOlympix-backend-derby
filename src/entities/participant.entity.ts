import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import { TimeStampEntity } from "./timestamp.abstract";
import { Team } from "./team.entity";

export enum ParticipantStatus {
  CAPTAIN = "captain",
  MEMBER = "member",
}

@Entity({ name: "participants" })
export class Participant extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: "varchar", length: 60, unique: true })
  @IsNotEmpty()
  @Length(5, 60)
  email: string;

  @Column({
    type: "enum",
    enum: ParticipantStatus,
    default: ParticipantStatus.MEMBER,
  })
  @IsEnum(ParticipantStatus)
  @IsOptional()
  status?: ParticipantStatus;

  @Column({ type: "varchar", length: 50 })
  @IsString()
  @Length(3, 50)
  username: string;

  @Column({ type: "varchar", length: 50 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ type: "varchar", length: 50 })
  @IsString()
  @IsNotEmpty()
  family_name: string;

  // Many participants belong to one team
  //when a Team is deleted, the database will automatically delete all Participant records that reference that team.
  @ManyToOne(() => Team, (team) => team.participants, { onDelete: "CASCADE" })
  @JoinColumn({ name: "team_id" })
  team: Team;
}
