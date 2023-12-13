import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  activity_id!: number;

  @Column()
  username!: string;

  @Column()
  img_url!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  role_id!: number;

  @Column()
  is_active!: boolean;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;
}
