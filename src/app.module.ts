import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // ВНИМАНИЕ: TypeOrmModule временно закомментирован.
    // Мы подключим БД позже, через переменную DATABASE_URL от Railway.
    // TypeOrmModule.forRoot({ ... }),
  ],
})
export class AppModule {}
