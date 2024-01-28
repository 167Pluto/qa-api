import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get('ping')
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ status: 200, description: 'Pong!' })
  getHello(): string {
    return 'Pong!';
  }
}
