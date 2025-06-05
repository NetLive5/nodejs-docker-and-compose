import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/singin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('singin')
  signin(@Body() loginDto: LoginDto) {
    return this.authService.signin(loginDto);
  }
}
