import { Body, Controller, Get, Post } from '@nestjs/common';
import RegisterDto from './register.dto';
import LoginDto from './login.dto';
import { Auth } from './auth.decorator';

@Controller('api/auth')
export class AuthController {
  @Post('login')
  login(@Body() body: LoginDto) {
    console.log(body);

    return 'Login';
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
