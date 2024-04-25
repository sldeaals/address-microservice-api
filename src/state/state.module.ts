import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StateController } from './state.controller';
import { StateService } from './state.service';
import { StateModel, StateSchema } from './state.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'State', schema: StateSchema }])],
  controllers: [StateController],
  providers: [StateService, StateModel],
  exports: [StateService],
})
export class StateModule {}
