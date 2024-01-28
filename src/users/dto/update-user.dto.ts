import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';

export class UpdateUserDto extends CreateUserDto {
  @IsOptional()
  email: string;

  @IsOptional()
  username: string;

  @IsOptional()
  password: string;
  @ApiProperty({ example: 'Password123!' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`! @#$%^&*()_+\-={}\[\]\\\|:;"'<,>.?\/])[A-Za-z\d~`! @#$%^&*()_+\-={}\[\]\\\|:;"'<,>.?\/]{8,}$/,
    {
      message:
        'Password must contain at least 8 characters, one uppercase and lowercase letter, one number and one special character',
    },
  )
  @IsOptional()
  currentPassword: string;
}
