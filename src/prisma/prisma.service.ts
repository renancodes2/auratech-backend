import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });

    super({ adapter });
  }
  async onModuleInit() {
    try {
      await this.$connect();
      Logger.log(
        'Conexão com o banco de dados Prisma estabelecida com sucesso.',
      );
    } catch (error) {
      Logger.error('Falha ao conectar ao banco de dados:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    Logger.log('Conexão com o banco de dados Prisma encerrada.');
  }
}
