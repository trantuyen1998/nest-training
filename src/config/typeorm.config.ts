import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'tuyen1998',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity.ts'], //use entities to translate to table database
  synchronize: true,
};
