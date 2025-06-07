import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './public.decorator';
import { SignInResponseDto } from './dto/sign-in-response.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiConsumes('application/json')
  @ApiBody({ type: SignInDto })
  @ApiOperation({ summary: 'Sign in' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User signed in successfully',
    type: SignInResponseDto,
  })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('check')
  @ApiBearerAuth('jwt-token')
  @ApiOperation({ summary: 'Check Token' })
  @HttpCode(HttpStatus.OK)
  check() {
    return {
      success: true,
      message: 'Token i s valid',
    };
  }
}
