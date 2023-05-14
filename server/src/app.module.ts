import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ExercisesModule from './exercises/exercises.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/translateme'),
    ExercisesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
