import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'bobby@ginger.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'Password123!' })
  @IsString()
  password: string;
}
