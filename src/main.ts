import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({
    // origin: 'http://example.com',
    methods: 'GET,POST,PUT,DELETE',
    // allowedHeaders: 'Content-Type, Authorization',
    // credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
