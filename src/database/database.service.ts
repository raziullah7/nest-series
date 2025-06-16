import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  // we await the connection to prisma
  async onModuleInit() {
    await this.$connect()
  }
}
