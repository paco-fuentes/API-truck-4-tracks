import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
