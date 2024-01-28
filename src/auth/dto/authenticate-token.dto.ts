import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateTokenDto {
  @ApiProperty({ example: 'someRandomToken' })
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
