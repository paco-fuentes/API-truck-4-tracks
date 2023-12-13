import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GenreBand } from "./GenreBand";

@Entity("genres")
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  genre_name!: string;

  @Column()
  is_active!: boolean;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @OneToMany(() => GenreBand, (genreBand) => genreBand.genre)
  genreBands!: GenreBand[];
}
