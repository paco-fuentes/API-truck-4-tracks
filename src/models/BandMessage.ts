import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Band } from "./Band";
import { User } from "./User";

@Entity("band_messages")
export class BandMessage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  band_id!: number;

  @Column()
  user_id!: number;

  @Column()
  message!: string;

  @Column()
  is_active!: boolean;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @ManyToOne(() => Band)
  @JoinColumn({ name: "band_id" })
  band!: Band;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;
}
