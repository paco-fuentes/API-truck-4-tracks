import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_activities")
export class UserActivity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  activity!: string;

  @Column()
  is_active!: boolean;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;
}
