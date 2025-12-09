import { Controller, Get, Patch, Param, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Пользователи')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Получить всех пользователей',
    description: 'Возвращает список всех зарегистрированных пользователей'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Список пользователей успешно получен',
    schema: {
      example: [
        {
          id: 'd5d90c66-7eb4-4e67-8888-0aad99cc30fc',
          username: 'admin1',
          email: 'admin1@mail.ru',
          role: 'user',
          rating: 100,
          createdAt: '2024-01-01T12:00:00.000Z',
          updatedAt: '2024-01-01T12:00:00.000Z'
        },
        {
          id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
          username: 'user2',
          email: 'user2@example.com',
          role: 'user',
          rating: 50,
          createdAt: '2024-01-02T10:00:00.000Z',
          updatedAt: '2024-01-02T10:00:00.000Z'
        }
      ]
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Неавторизован - требуется токен доступа' 
  })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Получить пользователя по ID',
    description: 'Возвращает информацию о конкретном пользователе'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'UUID пользователя',
    example: 'd5d90c66-7eb4-4e67-8888-0aad99cc30fc'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Информация о пользователе успешно получена',
    schema: {
      example: {
        id: 'd5d90c66-7eb4-4e67-8888-0aad99cc30fc',
        username: 'admin1',
        email: 'admin1@mail.ru',
        role: 'user',
        rating: 100,
        createdAt: '2024-01-01T12:00:00.000Z',
        updatedAt: '2024-01-01T12:00:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Неавторизован - требуется токен доступа' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Пользователь не найден' 
  })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Обновить данные пользователя',
    description: 'Обновляет информацию о пользователе по ID'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'UUID пользователя',
    example: 'd5d90c66-7eb4-4e67-8888-0aad99cc30fc'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Данные пользователя успешно обновлены',
    schema: {
      example: {
        id: 'd5d90c66-7eb4-4e67-8888-0aad99cc30fc',
        username: 'admin1_updated',
        email: 'admin1@mail.ru',
        role: 'admin',
        rating: 150,
        createdAt: '2024-01-01T12:00:00.000Z',
        updatedAt: '2024-01-03T15:00:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Некорректный запрос - ошибка валидации' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Неавторизован - требуется токен доступа' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Пользователь не найден' 
  })
  @ApiBody({
    type: UpdateUserDto,
    examples: {
      example1: {
        summary: 'Пример обновления пользователя',
        value: {
          username: "admin1_updated",
          role: "admin",
          rating: 150
        }
      }
    }
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Удалить пользователя',
    description: 'Удаляет пользователя по ID'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'UUID пользователя',
    example: 'd5d90c66-7eb4-4e67-8888-0aad99cc30fc'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Пользователь успешно удален',
    schema: {
      example: {
        id: 'd5d90c66-7eb4-4e67-8888-0aad99cc30fc',
        username: 'admin1',
        email: 'admin1@mail.ru',
        role: 'user',
        rating: 100,
        createdAt: '2024-01-01T12:00:00.000Z',
        updatedAt: '2024-01-01T12:00:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Неавторизован - требуется токен доступа' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Пользователь не найден' 
  })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}