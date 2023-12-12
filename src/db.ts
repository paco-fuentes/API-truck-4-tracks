import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";

type database = "mysql" | "mariadb";

export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as database,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [],
    migrations: [],
    synchronize: false,
    logging: false,
  });