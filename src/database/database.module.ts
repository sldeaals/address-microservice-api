import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig } from './database.config';

@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig.uri, { dbName: mongoConfig.dbName }),
  ],
})
export class DatabaseModule {}
