import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
