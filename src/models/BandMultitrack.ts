import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Band } from "./Band";
import { Track } from "./Track";

@Entity("band_multitrack")
export class BandMultitrack extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  band_id!: number;

  @Column()
  project_title!: string;

  @Column()
  img_url!: string;

  @Column()
  is_active!: boolean;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @ManyToOne(() => Band)
  @JoinColumn({ name: "band_id" })
  band!: Band;

  @OneToMany(() => Track, (track) => track.multitrack)
  tracks!: Track[];
}
