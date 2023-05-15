import { IsString } from 'class-validator';

export class SentenceDto {
  @IsString()
  original: string;

  @IsString()
  translated: string;

  @IsString()
  position: number;
}
