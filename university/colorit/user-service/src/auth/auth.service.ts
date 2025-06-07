import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/users/schemas/user.schema';
import { MongoError } from 'mongodb'; 
import { LoginDto } from './dto/login.dto';
import { AccessTokenDto } from './dto/access-token.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AccessTokenDto> {
    const { email, password } = registerDto;
    const hashed = await bcrypt.hash(password, 10);

    try {
      const user = await this.usersService.create(email, hashed);
      return this.loginWithUser(user);
    } catch (error) {
      if (error instanceof MongoError) {
        switch (error.code) {
          case 11000:
            throw new ConflictException(
              'Пользователь с таким email уже существует',
            );
        }
      }
      throw error;
    }
  }

  async login(loginDto: LoginDto): Promise<AccessTokenDto> {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    return this.loginWithUser(user);
  }

  loginWithUser(user: UserDocument): AccessTokenDto {
    const payload = { sub: user._id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
