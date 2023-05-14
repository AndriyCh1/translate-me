import { Controller, Get } from '@nestjs/common';

@Controller('exercises')
export default class ExercisesController {
  @Get()
  async getAll(): Promise<void> {}
}
