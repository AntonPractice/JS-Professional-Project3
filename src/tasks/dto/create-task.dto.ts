import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskDifficulty } from '../entities/task.entity';

class ExampleDto {
  @ApiProperty({ 
    example: 'str1 = Открой, str2 = ворота',
    description: 'Входные данные'
  })
  @IsString()
  input: string;

  @ApiProperty({ 
    example: 'Откройворота',
    description: 'Выходные данные'
  })
  @IsString()
  output: string;

  @ApiProperty({ 
    example: 'Откройворота',
    description: 'Объяснение решения'
  })
  @IsString()
  explanation: string;
}

export class CreateTaskDto {
  @ApiProperty({ 
    example: 'Первое задание',
    description: 'Название задачи'
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ 
    example: 'Конкатенация строк',
    description: 'Описание задачи'
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ 
    enum: TaskDifficulty, 
    example: TaskDifficulty.EASY,
    description: 'Сложность задачи'
  })
  @IsNotEmpty()
  @IsEnum(TaskDifficulty)
  difficulty: TaskDifficulty;

  @ApiProperty({ 
    example: ['concatenation', 'easy'], 
    type: [String],
    description: 'Теги задачи'
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({ 
    type: [ExampleDto],
    description: 'Примеры ввода/вывода'
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExampleDto)
  examples: ExampleDto[];

  @ApiProperty({ 
    example: 'd5d90c66-7eb4-4e67-8888-0aad99cc30fc',
    description: 'ID автора задачи'
  })
  @IsNotEmpty()
  @IsString()
  authorId: string;

  @ApiProperty({ 
    example: 'admin',
    description: 'Роль автора'
  })
  @IsNotEmpty()
  @IsString()
  authorRole: string;
}