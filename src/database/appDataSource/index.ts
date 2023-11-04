import { DataSource } from 'typeorm';
require('dotenv').config();

const appDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: ['src/entities/*.ts'],
    migrations: ['src/database/migrations/*.ts']
})

export default appDataSource;