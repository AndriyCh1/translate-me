import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Exclude, Type } from 'class-transformer';
import { SentenceDto } from './sentence.dto';

export class UpdateExerciseDto {
  @IsOptional()
  @Exclude()
  _id: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SentenceDto)
  sentences: SentenceDto[];
}
