import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/public.decorator';

@Public()
@Controller()
export class ConsulController {
  @Get('/health')
  getHealth(): string {
    return 'OK';
  }
}
