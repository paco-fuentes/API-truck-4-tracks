import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("band_messages")
export class BandMessage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  band_id!: number;

  @Column()
  user_id!: number;

  @Column()
  message!: string;

  @Column()
  is_active!: boolean;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;
}
