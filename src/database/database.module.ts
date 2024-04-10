import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig } from './mongo.config';

@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig.uri),
  ],
})
export class DatabaseModule {}
