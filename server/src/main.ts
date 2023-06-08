import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import corsOptions from './config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors(corsOptions);
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
