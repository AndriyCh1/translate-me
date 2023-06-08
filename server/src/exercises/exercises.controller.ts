import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import CreateExerciseDto from './dto/create-exercise.dto';
import ExercisesService from './exercises.service';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Controller('/api/exercises')
export default class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get(':id')
  async get(@Param('id') id) {
    return await this.exercisesService.find(id);
  }

  @Get()
  async getAll() {
    return await this.exercisesService.findAll();
  }

  @Post()
  async create(@Body() exercise: CreateExerciseDto) {
    return await this.exercisesService.create(exercise);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateExerciseDto) {
    return await this.exercisesService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.exercisesService.delete(id);
  }
}
