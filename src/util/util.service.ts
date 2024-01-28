import { Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UtilService {
  constructor(private readonly configService: ConfigService) {}

  hashPassword(password: string): string {
    if (!password) return null;

    const salt = this.configService.get<string>('PASSWORD_SECRET');
    return createHmac('sha512', salt).update(password).digest('hex');
  }
}
