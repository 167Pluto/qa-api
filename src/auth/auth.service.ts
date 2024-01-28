import {
  BadGatewayException,
  BadRequestException,
  ImATeapotException,
  Injectable,
  ServiceUnavailableException
} from "@nestjs/common";
import { LoginDto } from './dto/login.dto';
import { LoginResponseData } from './interface/auth.interfaces';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

let counter = 1;

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(logInData: LoginDto): Promise<LoginResponseData> {
    const { email, password } = logInData;

    const token = await this.jwtService.signAsync({ email, password });

    if (counter % 3 === 0) {
      counter += 1;
      throw new BadGatewayException('Syntax error');
    }
    counter += 1;

    return {
      token: token,
      tokenExpirationTime:
        new Date().getTime() +
        parseInt(this.configService.get('TOKEN_EXPIRY_TIME')),
    };
  }
}
