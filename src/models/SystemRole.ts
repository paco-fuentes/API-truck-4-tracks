import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("system_roles")
export class SystemRole extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  system_role!: string;

  @Column()
  is_active!: boolean;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}
