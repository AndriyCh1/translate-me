import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise, ExerciseSchema } from './exercise.schema';
import ExercisesController from './exercises.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Exercise.name, schema: ExerciseSchema },
    ]),
  ],
  controllers: [ExercisesController],
  providers: [],
  exports: [],
})
class ExercisesModule {}

export default ExercisesModule;
