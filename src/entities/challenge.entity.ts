import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, IsString, IsJSON, IsOptional } from "class-validator";
import { TimeStampEntity } from "./timestamp.abstract";

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
}
