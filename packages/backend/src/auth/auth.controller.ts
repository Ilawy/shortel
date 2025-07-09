import { Body, Controller, Post } from '@nestjs/common';
import RegisterDto from './register.dto';
import LoginDto from './login.dto';

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
}
