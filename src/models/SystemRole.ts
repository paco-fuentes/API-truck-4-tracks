import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
