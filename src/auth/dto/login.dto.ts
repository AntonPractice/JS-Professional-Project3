import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ 
    example: 'admin1@mail.ru',
    description: 'Email адрес'
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ 
    example: '123456',
    description: 'Пароль'
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}