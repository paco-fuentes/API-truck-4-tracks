import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
