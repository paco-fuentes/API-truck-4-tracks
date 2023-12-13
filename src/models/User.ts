import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SystemRole } from "./SystemRole";
import { UserActivity } from "./UserActivity";
import { GearUser } from "./GearUser";
import { Band } from "./Band";
import { BandMember } from "./BandMember";
import { BandMessage } from "./BandMessage";
import { Track } from "./Track";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  role_id!: number;

  @Column()
  activity_id!: number;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  img_url!: string;

  @Column()
  is_active!: boolean;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @ManyToOne(() => SystemRole)
  @JoinColumn({ name: "role_id" })
  role!: SystemRole;

  @ManyToOne(() => UserActivity)
  @JoinColumn({ name: "activity_id" })
  activity!: UserActivity;

  @OneToMany(() => GearUser, (gearUser) => gearUser.user)
  gearUsers!: GearUser[];

  @OneToMany(() => Band, (band) => band.leader)
  bandsLed!: Band[];

  @OneToMany(() => BandMember, (bandMember) => bandMember.user)
  bandMembers!: BandMember[];

  @OneToMany(() => BandMessage, (bandMessage) => bandMessage.user)
  messages!: BandMessage[];

  @OneToMany(() => Track, (track) => track.user)
  tracks!: Track[];
}
