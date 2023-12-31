import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

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

  @OneToMany(() => User, (user) => user.activity)
  users!: User[];
}
