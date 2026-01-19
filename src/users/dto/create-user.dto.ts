import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ 
    example: 'admin1',
    description: 'Имя пользователя (уникальное)'
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ 
    example: 'admin1@mail.ru',
    description: 'Email адрес (уникальный)'
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ 
    example: '123456',
    description: 'Пароль (минимум 6 символов)',
    minLength: 6
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ 
    enum: UserRole, 
    example: UserRole.USER,
    description: 'Роль пользователя'
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}