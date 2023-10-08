import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loadAndValidateEnv } from './utils/envConfig';
import { configDotenv } from 'dotenv';
configDotenv();
async function bootstrap() {
  const env = loadAndValidateEnv(); // Carrega e valida as variáveis de ambiente

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
    }),
  );

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  await app.listen(env.BACKEND_PORT, () => {
    console.log(`🚀 Server running on port ${env.BACKEND_PORT}`);
  });
}

bootstrap();
