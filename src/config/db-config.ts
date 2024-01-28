import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import entities from '../users/entities';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities,
  synchronize: false,
  autoLoadEntities: true,
  migrationsTableName: `${process.env.POSTGRES_DATABASE}_migrations_typeorm`,
};

const migrations = [`src/migrations/*`];

export default registerAs(`${process.env.DB_NAME}Config`, () => config);
export const connectionDataSource = new DataSource({
  ...config,
  migrations,
} as DataSourceOptions);
