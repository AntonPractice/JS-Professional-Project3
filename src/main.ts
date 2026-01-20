import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Настройка CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });
  
  // Health check endpoint (Railway будет проверять этот путь)
  app.getHttpAdapter().get('/api/health', (req, res) => {
    res.json({ 
      status: 'OK',
      service: 'litcode-backend',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: process.env.DATABASE_URL ? 'configured' : 'not configured'
    });
  });
  
  // Swagger документация
  const config = new DocumentBuilder()
    .setTitle('LitCode API')
    .setDescription('API для платформы LitCode')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Приложение запущено на порту ${port}`);
  console.log(`📚 Swagger: http://localhost:${port}/api-docs`);
  console.log(`❤️  Health check: http://localhost:${port}/api/health`);
  
  if (process.env.DATABASE_URL) {
    console.log(`🗄️  Database URL: ${process.env.DATABASE_URL.substring(0, 30)}...`);
  }
}
bootstrap();