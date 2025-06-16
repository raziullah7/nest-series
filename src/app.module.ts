import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module';

@Module({
  imports: [
    UsersModule, 
    DatabaseModule, 
    EmployeesModule, 
    ThrottlerModule.forRoot(
      [
        // sets 2 conditions, short and long for the same user
        // short: no more than 3 requests per seconds
        // long: no more that 100 requests per minute
        {
          name: 'short',
          ttl: 1000,
          limit: 3,
        },
        {
          name: 'long',
          ttl: 60000,
          limit: 100,
        },
      ]), MyLoggerModule
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}
