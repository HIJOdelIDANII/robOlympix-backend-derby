import { Exclude } from "class-transformer";
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class TimeStampEntity extends BaseEntity {
  @CreateDateColumn({
    type: "timestamp",
    name: "created_at",
  })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({
    type: "datetime",
    name: "updated_at",
  })
  @Exclude()
  updatedAt: Date;
}
