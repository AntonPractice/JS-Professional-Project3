// src/database.config.ts
function parseDatabaseUrl(databaseUrl: string) {
  try {
    // Для Railway формата: postgresql://user:password@host:port/database
    const url = new URL(databaseUrl);
    
    // Извлекаем путь к базе данных (убираем первый слэш)
    const database = url.pathname.replace('/', '');
    
    return {
      host: url.hostname,
      port: parseInt(url.port, 10) || 5432,
      username: url.username,
      password: url.password,
      database: database,
      ssl: { rejectUnauthorized: false },
    };
  } catch (error) {
    console.error('Failed to parse DATABASE_URL:', error);
    return null;
  }
}

export function getDatabaseConfig() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (databaseUrl) {
    const parsed = parseDatabaseUrl(databaseUrl);
    if (parsed) {
      return {
        type: 'postgres',
        ...parsed,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV !== 'production',
      };
    }
  }

  // Локальная конфигурация
  const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;
  
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: isNaN(port) ? 5432 : port,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'litcode',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV !== 'production',
  };
}