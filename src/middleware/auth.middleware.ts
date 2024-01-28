import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction): Promise<any> {
    if (!req.headers.authorization) {
      throw new UnauthorizedException('Session expired, please login!');
    }
    let user: object;
    let accessToken: string;
    try {
      accessToken = req.headers.authorization.split(' ')[1];
      await this.jwtService.verifyAsync(accessToken);

      user = this.jwtService.decode(accessToken) as object;
    } catch (error) {
      throw new ForbiddenException('Authentication failure');
    }

    if (!user) {
      throw new UnprocessableEntityException('User not found');
    }

    res.locals.user = user;
    res.locals.accessToken = accessToken;
    next();
  }
}
