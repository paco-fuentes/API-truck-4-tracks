import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { GenreBand } from "./GenreBand";
import { BandMember } from "./BandMember";
import { BandMessage } from "./BandMessage";
import { BandMultitrack } from "./BandMultitrack";
import { Song } from "./Song";

@Entity("bands")
export class Band extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  band_leader!: number;

  @Column()
  band_name!: string;

  @Column()
  about!: string;

  @Column()
  img_url!: string;

  @Column()
  hiring!: string;

  @Column()
  is_active!: boolean;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "band_leader" })
  leader!: User;

  @OneToMany(() => GenreBand, (genreBand) => genreBand.band)
  genres!: GenreBand[];

  @OneToMany(() => BandMember, (bandMember) => bandMember.band)
  members!: BandMember[];

  @OneToMany(() => BandMessage, (bandMessage) => bandMessage.band)
  messages!: BandMessage[];

  @OneToMany(() => BandMultitrack, (bandMultitrack) => bandMultitrack.band)
  multitracks!: BandMultitrack[];

  @OneToMany(() => Song, (song) => song.band)
  songs!: Song[];
}
