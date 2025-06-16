import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Cambia esto si tu frontend está en otro dominio o puerto
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
