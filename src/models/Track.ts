import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { BandMultitrack } from "./BandMultitrack";

@Entity("tracks")
export class Track extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  multitrack_id!: number;

  @Column()
  user_id!: number;

  @Column()
  track_name!: string;

  @Column()
  img_url!: string;

  @Column()
  track_url!: string;

  @Column()
  is_active!: boolean;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @ManyToOne(() => BandMultitrack)
  @JoinColumn({ name: "multitrack_id" })
  multitrack!: BandMultitrack;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;
}
