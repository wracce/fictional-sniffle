import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { IS_PUBLIC_KEY } from './public.decorator';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Проверяем, является ли маршрут публичным
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    // Проверяем тип контекста (HTTP, RPC, WebSocket и т.д.)
    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest<Request>();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('Токен отсутствует в заголовках');
      }
      try {
        const payload = await this.authService.validateToken(token);
        request['user'] = payload; // Добавляем данные пользователя в запрос
      } catch {
        throw new UnauthorizedException('Неверный токен');
      }
      return true;
    }

    // Для других типов контекста (например, RabbitMQ) возвращаем true
    // или выполняем свою собственную логику авторизации
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
