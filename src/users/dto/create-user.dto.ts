import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'bobby@ginger.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'Bobby Ginger' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'Password123!' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`! @#$%^&*()_+\-={}\[\]\\\|:;"'<,>.?\/])[A-Za-z\d~`! @#$%^&*()_+\-={}\[\]\\\|:;"'<,>.?\/]{8,}$/,
    {
      message:
        'Password must contain at least 8 characters, one uppercase and lowercase letter, one number and one special character',
    },
  )
  password: string;
}
