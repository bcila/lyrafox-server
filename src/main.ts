import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new PrismaClientExceptionFilter());

  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  // app.enableCors({
  //   // origin: 'http://example.com',
  //   methods: 'GET,POST,PUT,DELETE',
  //   // allowedHeaders: 'Content-Type, Authorization',
  //   // credentials: true,
  // });

  const config = new DocumentBuilder()
    .setTitle('LyraFox')
    .setDescription('The LyraFox API documentation')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`App is running on ${await app.getUrl()}`);
}

bootstrap();
