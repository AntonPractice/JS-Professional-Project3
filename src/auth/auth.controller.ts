import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Регистрация нового пользователя',
    description: 'Создание новой учетной записи пользователя'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Пользователь успешно зарегистрирован',
    schema: {
      example: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 'd5d90c66-7eb4-4e67-8888-0aad99cc30fc',
          username: 'admin1',
          email: 'admin1@mail.ru',
          role: 'user',
          rating: 0,
          createdAt: '2024-01-01T12:00:00.000Z',
          updatedAt: '2024-01-01T12:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Некорректный запрос - ошибка валидации' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Конфликт - пользователь уже существует' 
  })
  @ApiBody({ 
    type: CreateUserDto,
    examples: {
      example1: {
        summary: 'Пример регистрации',
        value: {
          username: "admin1",
          email: "admin1@mail.ru",
          password: "123456",
          role: "user"
        }
      }
    }
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Вход пользователя',
    description: 'Аутентификация пользователя по email и паролю'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Пользователь успешно авторизован',
    schema: {
      example: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 'd5d90c66-7eb4-4e67-8888-0aad99cc30fc',
          username: 'admin1',
          email: 'admin1@mail.ru',
          role: 'user',
          rating: 0,
          createdAt: '2024-01-01T12:00:00.000Z',
          updatedAt: '2024-01-01T12:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Неавторизован - неверные учетные данные' 
  })
  @ApiBody({ 
    type: LoginDto,
    examples: {
      example1: {
        summary: 'Пример входа',
        value: {
          email: "admin1@mail.ru",
          password: "123456"
        }
      }
    }
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}