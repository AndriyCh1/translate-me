import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exercise, ExerciseDocument } from './exercise.schema';
import CreateExerciseDto from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
class ExercisesService {
  constructor(
    @InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>,
  ) {}

  async find(id: string): Promise<ExerciseDocument> {
    const exercise = await this.exerciseModel.findOne({ _id: id });

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    return exercise;
  }

  async findAll(): Promise<ExerciseDocument[]> {
    const exercises = await this.exerciseModel.find({});

    return exercises;
  }

  async create(exerciseData: CreateExerciseDto): Promise<ExerciseDocument> {
    const createdExercise = new this.exerciseModel({
      ...exerciseData,
    });

    return await createdExercise.save();
  }

  async update(id: string, data: UpdateExerciseDto): Promise<ExerciseDocument> {
    const updatedExercise = await this.exerciseModel.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { new: true },
    );

    if (!updatedExercise) {
      throw new NotFoundException('Exercise not found');
    }

    return updatedExercise;
  }

  async delete(id: string): Promise<void> {
    const exercise = await this.exerciseModel.findOneAndDelete({ _id: id });

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }
  }
}

export default ExercisesService;
