import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('Задачи')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Получить все задачи',
    description: 'Возвращает список всех задач'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Список задач успешно получен',
    schema: {
      example: [
        {
          id: 'f8d7e6c5-b4a3-42a1-9b8c-7d6e5f4a3b2c',
          title: 'Первое задание',
          description: 'Конкатенация строк',
          difficulty: 'easy',
          tags: ['concatenation', 'easy'],
          examples: [
            {
              input: 'str1 = Открой, str2 = ворота',
              output: 'Откройворота',
              explanation: 'Откройворота'
            }
          ],
          authorId: 'd5d90c66-7eb4-4e67-8888-0aad99cc30fc',
          authorRole: 'admin',
          rating: 4.5,
          createdAt: '2024-01-01T12:00:00.000Z'
        }
      ]
    }
  })
  async findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Получить задачу по ID',
    description: 'Возвращает информацию о конкретной задаче'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'UUID задачи',
    example: 'f8d7e6c5-b4a3-42a1-9b8c-7d6e5f4a3b2c'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Информация о задаче успешно получена',
    schema: {
      example: {
        id: 'f8d7e6c5-b4a3-42a1-9b8c-7d6e5f4a3b2c',
        title: 'Первое задание',
        description: 'Конкатенация строк',
        difficulty: 'easy',
        tags: ['concatenation', 'easy'],
        examples: [
          {
            input: 'str1 = Открой, str2 = ворота',
            output: 'Откройворота',
            explanation: 'Откройворота'
          }
        ],
        authorId: 'd5d90c66-7eb4-4e67-8888-0aad99cc30fc',
        authorRole: 'admin',
        rating: 4.5,
        createdAt: '2024-01-01T12:00:00.000Z',
        author: {
          id: 'd5d90c66-7eb4-4e67-8888-0aad99cc30fc',
          username: 'admin1',
          email: 'admin1@mail.ru',
          role: 'admin',
          rating: 100
        }
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Задача не найдена' 
  })
  async findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Post()
  @ApiOperation({ 
    summary: 'Создать новую задачу',
    description: 'Создает новую задачу для решения'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Задача успешно создана',
    schema: {
      example: {
        id: 'f8d7e6c5-b4a3-42a1-9b8c-7d6e5f4a3b2c',
        title: 'Первое задание',
        description: 'Конкатенация строк',
        difficulty: 'easy',
        tags: ['concatenation', 'easy'],
        examples: [
          {
            input: 'str1 = Открой, str2 = ворота',
            output: 'Откройворота',
            explanation: 'Откройворота'
          }
        ],
        authorId: 'd5d90c66-7eb4-4e67-8888-0aad99cc30fc',
        authorRole: 'admin',
        rating: 0,
        createdAt: '2024-01-01T12:00:00.000Z'
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
  @ApiBody({
    type: CreateTaskDto,
    examples: {
      example1: {
        summary: 'Пример создания задачи',
        value: {
          title: "Первое задание",
          description: "Конкатенация строк",
          difficulty: "easy",
          tags: ["concatenation", "easy"],
          examples: [
            {
              input: "str1 = Открой, str2 = ворота",
              output: "Откройворота",
              explanation: "Откройворота"
            }
          ],
          authorId: "d5d90c66-7eb4-4e67-8888-0aad99cc30fc",
          authorRole: "admin"
        }
      }
    }
  })
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Обновить задачу',
    description: 'Обновляет информацию о задаче по ID'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'UUID задачи',
    example: 'f8d7e6c5-b4a3-42a1-9b8c-7d6e5f4a3b2c'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Задача успешно обновлена',
    schema: {
      example: {
        id: 'f8d7e6c5-b4a3-42a1-9b8c-7d6e5f4a3b2c',
        title: 'Первое задание (обновленное)',
        description: 'Конкатенация строк - продвинутый уровень',
        difficulty: 'medium',
        tags: ['concatenation', 'medium'],
        examples: [
          {
            input: 'str1 = Открой, str2 = ворота',
            output: 'Откройворота',
            explanation: 'Откройворота'
          },
          {
            input: 'str1 = Hello, str2 = World',
            output: 'HelloWorld',
            explanation: 'HelloWorld'
          }
        ],
        authorId: 'd5d90c66-7eb4-4e67-8888-0aad99cc30fc',
        authorRole: 'admin',
        rating: 4.8,
        createdAt: '2024-01-01T12:00:00.000Z'
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
    description: 'Задача не найдена' 
  })
  @ApiBody({
    type: UpdateTaskDto,
    examples: {
      example1: {
        summary: 'Пример обновления задачи',
        value: {
          title: "Первое задание (обновленное)",
          description: "Конкатенация строк - продвинутый уровень",
          difficulty: "medium",
          tags: ["concatenation", "medium"],
          examples: [
            {
              input: "str1 = Открой, str2 = ворота",
              output: "Откройворота",
              explanation: "Откройворота"
            },
            {
              input: "str1 = Hello, str2 = World",
              output: "HelloWorld",
              explanation: "HelloWorld"
            }
          ],
          rating: 4.8
        }
      }
    }
  })
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Удалить задачу',
    description: 'Удаляет задачу по ID'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'UUID задачи',
    example: 'f8d7e6c5-b4a3-42a1-9b8c-7d6e5f4a3b2c'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Задача успешно удалена',
    schema: {
      example: {
        id: 'f8d7e6c5-b4a3-42a1-9b8c-7d6e5f4a3b2c',
        title: 'Первое задание',
        description: 'Конкатенация строк',
        difficulty: 'easy',
        tags: ['concatenation', 'easy'],
        examples: [
          {
            input: 'str1 = Открой, str2 = ворота',
            output: 'Откройворота',
            explanation: 'Откройворота'
          }
        ],
        authorId: 'd5d90c66-7eb4-4e67-8888-0aad99cc30fc',
        authorRole: 'admin',
        rating: 4.5,
        createdAt: '2024-01-01T12:00:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Неавторизован - требуется токен доступа' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Задача не найдена' 
  })
  async remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}