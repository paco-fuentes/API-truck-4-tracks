import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Band } from "./Band";
import { Genre } from "./Genre";

@Entity("genres_band")
export class GenreBand extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  band_id!: number;

  @Column()
  genre_id!: number;

  @Column()
  is_active!: boolean;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @ManyToOne(() => Band)
  @JoinColumn({ name: "band_id" })
  band!: Band;

  @ManyToOne(() => Genre)
  @JoinColumn({ name: "genre_id" })
  genre!: Genre;
}
