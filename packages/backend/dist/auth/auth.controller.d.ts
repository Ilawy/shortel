import RegisterDto from './register.dto';
import LoginDto from './login.dto';
export declare class AuthController {
    login(body: LoginDto): string;
    register(body: RegisterDto): string;
}
