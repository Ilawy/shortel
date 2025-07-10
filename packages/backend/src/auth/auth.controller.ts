import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import RegisterDto from './register.dto';
import LoginDto from './login.dto';
import { Auth } from './auth.decorator';

@Controller('api/auth')
export class AuthController {
  @Post('login')
  login(@Body() body: LoginDto) {
    console.log(body);
    throw new HttpException(
      'Email or password is incorrect',
      HttpStatus.UNAUTHORIZED,
    );
  }

  @Post('register')
  register(@Body() body: RegisterDto) {
    console.log(body);

    return 'Register';
  }

  @Get('me')
  @Auth()
  me() {
    return {
      id: 1,
      email: 'a@b.com',
    };
  }
}
