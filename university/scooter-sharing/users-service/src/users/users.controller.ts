import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserProfileResponseDto } from './dto/user.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { Public } from '../auth/public.decorator';
import { RentScooterDto } from './dto/rent.dto';
import { CreateRequestDto } from './dto/create-request.dto';
import { RentScooterResponseDto } from './dto/rent-responce.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post('register')
  @ApiConsumes('application/json')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User registered successfully',
    type: RegisterResponseDto,
  })
  @HttpCode(HttpStatus.CREATED)
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Get('profile')
  @ApiBearerAuth('jwt-token')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    type: UserProfileResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  getProfile(@Request() req: any) {
    return this.usersService.findOneByEmail(req.user.email);
  }

  @Post('rent-scooter/:id')
  @ApiBearerAuth('jwt-token')
  @ApiOperation({ summary: 'Rent scooter' })
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: RentScooterDto, description:'rent scooter' , examples: { 'rent scooter': { value: { endDate: '2024-12-15' } } } })
  @ApiResponse({ status: 200, description: 'Scooter rented successfully', type: RentScooterResponseDto })
  rentScooter(
    @Request() req: any,
    @Param('id') scooterId: string,
    @Body('endDate') endDate: string
  ) {
    return this.usersService.rentScooter(req.user.sub, scooterId,req.headers.authorization, endDate);
  }

  @Post('/request')
  @ApiBearerAuth('jwt-token')
  @ApiOperation({ summary: 'Создаем донос' })
  @ApiResponse({ status: 200, description: 'Донос успешно создан' })
  @HttpCode(HttpStatus.OK)
  createRequest(@Body() createValueDto: CreateRequestDto) {
    return this.usersService.createRequest(createValueDto.value);
  }

}
