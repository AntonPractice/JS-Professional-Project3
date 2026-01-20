import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // Получаем DATABASE_URL, который Railway автоматически добавил
        const databaseUrl = configService.get<string>('DATABASE_URL');
        
        if (databaseUrl) {
          // КОНФИГУРАЦИЯ ДЛЯ RAILWAY
          return {
            type: 'postgres',
            url: databaseUrl,
            ssl: {
              rejectUnauthorized: false, // ОБЯЗАТЕЛЬНО для Railway
            },
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true, // Для разработки. В продакшене лучше false
            retryDelay: 5000, // Пауза между попытками подключения
            retryAttempts: 10, // Количество попыток
          };
        }

        // КОНФИГУРАЦИЯ ДЛЯ ЛОКАЛЬНОЙ РАЗРАБОТКИ (если нет DATABASE_URL)
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: configService.get<number>('DB_PORT', 5432),
          username: configService.get<string>('DB_USERNAME', 'postgres'),
          password: configService.get<string>('DB_PASSWORD', 'postgres'),
          database: configService.get<string>('DB_DATABASE', 'litcode'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
    }),
  ],
})
export class AppModule {}