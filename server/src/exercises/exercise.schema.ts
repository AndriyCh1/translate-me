import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExerciseDocument = Exercise & Document;

@Schema()
export class Exercise {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop([
    raw({
      original: { type: String },
      translated: { type: String },
      position: Number,
    }),
  ])
  sentences: Record<string, any>[];
}

const ExerciseSchema = SchemaFactory.createForClass(Exercise);
ExerciseSchema.index({ title: 'text' });

export { ExerciseSchema };
