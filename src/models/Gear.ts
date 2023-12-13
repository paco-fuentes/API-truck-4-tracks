import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("gear")
export class Gear extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  gear_name!: string;

  @Column()
  gear_type!: string;

  @Column()
  is_active!: boolean;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;
}
