import { Entity, PrimaryColumn, Column } from "typeorm";
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import { TimeStampEntity } from "./timestamp.abstract";

export enum ParticipantStatus {
  CAPTAIN = "captain",
  MEMBER = "member",
}

@Entity({ name: "participants" })
export class Participant extends TimeStampEntity{
  @PrimaryColumn()
  user_id: number;

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
}
