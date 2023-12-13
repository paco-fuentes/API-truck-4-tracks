import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { CreateSystemRolesTable1702409306830 } from "./migration/1702409306830-create-system-roles-table";
import { CreateGearTable1702409350832 } from "./migration/1702409350832-create-gear-table";
import { CreateGenresTable1702409381753 } from "./migration/1702409381753-create-genres-table";
import { CreateUserActivitiesTable1702409963272 } from "./migration/1702409963272-create-user-activities-table";
import { CreateUsersTable1702458548209 } from "./migration/1702458548209-create-users-table";
import { CreateGearUsersTable1702458899146 } from "./migration/1702458899146-create-gear-users-table";
import { CreateBandsTable1702459458467 } from "./migration/1702459458467-create-bands-table";
import { CreateGenresBandTable1702466777706 } from "./migration/1702466777706-create-genres-band-table";
import { CreateBandMembersTable1702467079110 } from "./migration/1702467079110-create-band-members-table";
import { CreateBandMessagesTable1702467368173 } from "./migration/1702467368173-create-band-messages-table";
import { CreateBandMultitrackTable1702467551656 } from "./migration/1702467551656-create-band-multitrack-table";
import { CreateTracksTable1702467751643 } from "./migration/1702467751643-create-tracks-table";
import { CreateSongsTable1702468040447 } from "./migration/1702468040447-create-songs-table";

type database = "mysql";

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as database,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [],
  migrations: [
    CreateSystemRolesTable1702409306830,
    CreateGearTable1702409350832,
    CreateGenresTable1702409381753,
    CreateUserActivitiesTable1702409963272,
    CreateUsersTable1702458548209,
    CreateGearUsersTable1702458899146,
    CreateBandsTable1702459458467,
    CreateGenresBandTable1702466777706,
    CreateBandMembersTable1702467079110,
    CreateBandMessagesTable1702467368173,
    CreateBandMultitrackTable1702467551656,
    CreateTracksTable1702467751643,
    CreateSongsTable1702468040447,
  ],
  synchronize: false,
  logging: false,
});
