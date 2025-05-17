import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS (origen: http://localhost:5173 o el que uses para frontend)
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true, // si usas cookies o auth con credentials
  });

  await app.listen(3000);
}
bootstrap();
