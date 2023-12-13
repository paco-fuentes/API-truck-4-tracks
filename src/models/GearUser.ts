import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("gear_users")
export class GearUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column()
  gear_id!: number;

  @Column()
  is_active!: boolean;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;
}
