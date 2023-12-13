import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
