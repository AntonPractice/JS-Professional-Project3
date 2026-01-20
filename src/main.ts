import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // НАСТРОЙКА CORS ДЛЯ RAILWAY
  app.enableCors();
  
  // СОЗДАНИЕ ПРОСТОГО HEALTH CHECK ENDPOINT
  app.getHttpAdapter().get('/api/health', (req, res) => {
    res.json({ 
      status: 'OK',
      service: 'litcode-backend',
      timestamp: new Date().toISOString(),
      database: 'not connected (temporary)'
    });
  });
  
  // НАСТРОЙКА SWAGGER
  const config = new DocumentBuilder()
    .setTitle('LitCode API')
    .setDescription('API для платформы LitCode')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  
  // ПОРТ ИЗ ПЕРЕМЕННОЙ ОКРУЖЕНИЯ ИЛИ 3000
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Приложение запущено на http://localhost:${port}`);
  console.log(`📚 Swagger доступен на http://localhost:${port}/api-docs`);
}
bootstrap();
