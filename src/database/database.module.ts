import { Module, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { PrismaClient } from 'generated/prisma';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService]
})

// export class DatabaseModule extends PrismaClient implements OnModuleInit {
//   // we await the connection to prisma
//   async onModuleInit() {
//     await this.$connect()
//   }
// }

export class DatabaseModule {}
