import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BaseEntity,
  } from "typeorm";
  import { Match } from "./match.entity";
  import { Team } from "./team.entity";
import { TimeStampEntity } from "./timestamp.abstract";
  
  export enum ViolationType { 
    YELLOW = "yellow",
    RED = "RED",
    DISQUALIFICATION = "disqualification"
  }
  
  @Entity("violations")
  export class Violation extends TimeStampEntity{
    @PrimaryGeneratedColumn()
    violation_id: number;
  
    @Column({
      type: "enum",
      enum: ViolationType,
      default: ViolationType.YELLOW,
    })
    violationType: ViolationType;
  
    @ManyToOne(() => Match, (match) => match.violations, { onDelete: "CASCADE" })
    @JoinColumn({ name: "match_id" })
    match: Match;
    
    @ManyToOne(() => Team, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "team_id" })
    team: Team;

  }
  