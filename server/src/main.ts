import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const corsOptions: CorsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5000'],
  };

  app.enableCors(corsOptions);
  await app.listen(5000);
}
bootstrap();
