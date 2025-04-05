import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { MatchPowerUp } from "./match-powerup.entity";

export enum Description {
  YELLOW = "net enlarged",
  BLUE = "goal worth double",
  RED = "goal shrunk",
}

@Entity("power_ups")
export class PowerUp extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 15 , unique: true  }) // red, yellow, blue, etc.
  color: string;

  @Column({ type: "enum", enum: Description })
  description: Description;

  @OneToMany(() => MatchPowerUp, (mpu) => mpu.powerup)
  matchPowerUps: MatchPowerUp[];
}
