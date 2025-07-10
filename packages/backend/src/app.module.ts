import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService, JwtService],
})
export class AppModule {}
