import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import llmhubConfig from '../config/llmhub.config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { PrismaClientExceptionFilter } from '../common/filters/prisma-client-exception.filter';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [llmhubConfig],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: PrismaClientExceptionFilter,
    // },
    {
      provide: APP_FILTER,
      useFactory: () => {
        return [new HttpExceptionFilter(), new PrismaClientExceptionFilter()];
      },
    },
  ],
})
export class CoreModule {}
