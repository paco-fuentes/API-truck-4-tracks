import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Band } from "./Band";

@Entity("songs")
export class Song extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  band_id!: number;

  @Column()
  song_name!: string;

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

  @ManyToOne(() => Band)
  @JoinColumn({ name: "band_id" })
  band!: Band;
}
