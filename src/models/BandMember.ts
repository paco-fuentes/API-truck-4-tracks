import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("band_members")
export class BandMember extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  band_id!: number;

  @Column()
  user_id!: number;

  @Column()
  is_active!: boolean;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;
}
