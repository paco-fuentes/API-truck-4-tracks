import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("bands")
export class Band extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  band_leader!: number;

  @Column()
  band_name!: string;

  @Column()
  about!: string;

  @Column()
  img_url!: string;

  @Column()
  hiring!: string;

  @Column()
  is_active!: boolean;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;
}
