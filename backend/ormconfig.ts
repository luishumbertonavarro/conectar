import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

export default new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
});
