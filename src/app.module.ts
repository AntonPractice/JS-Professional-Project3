import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // ВРЕМЕННО: используем синхронную конфигурацию
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres', // ← Жестко закодировано для теста
      port: 5432,
      username: 'postgres',
      password: 'postgres123',
      database: 'litcode_dev',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
    TasksModule,
  ],
})
export class AppModule {}