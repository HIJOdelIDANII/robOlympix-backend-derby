import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BaseEntity,
  } from "typeorm";
  import { MatchPowerUp } from "./match-powerup.entity";
  
  @Entity("power_ups")
  export class PowerUp extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", length: 20 }) // red, yellow, blue, etc.
  
    @OneToMany(() => MatchPowerUp, (mpu) => mpu.powerup)
    matchPowerUps: MatchPowerUp[];
  }
  