import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GearUser } from "./GearUser";

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

  @OneToMany(() => GearUser, (gearUser) => gearUser.gear)
  gearUsers!: GearUser[];
}
