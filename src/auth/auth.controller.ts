import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginResponseData } from './interface/auth.interfaces';

@ApiTags('Authorization Routes')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'User Login' })
  @Post('login')
  async login(@Body() logInData: LoginDto): Promise<LoginResponseData> {
    return await this.authService.login(logInData);
  }
}
