import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLoggerService } from './my-logger/my-logger.service';
import { AllExceptionFilter } from './all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // // modified the app to add the logger
  // const app = await NestFactory.create(AppModule, {
  //   bufferLogs: true,
  // });
  // // to use logger
  // app.useLogger(app.get(MyLoggerService))

  // adding the all-exception filter
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter))

  // enable CORS for the public (no watchlist)
  app.enableCors()

  // to make all request come as 'localhost:3000/api/user...'
  app.setGlobalPrefix("api")

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
