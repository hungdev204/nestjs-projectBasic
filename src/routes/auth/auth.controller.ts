import { Body, ClassSerializerInterceptor, Controller, Post, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { LoginBodyDto, LoginResDto, RegisterBodyDto, RegisterResDto } from 'src/routes/auth/auth.dto';
import { AuthService } from 'src/routes/auth/auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @SerializeOptions({ type: RegisterResDto })
    @Post('register')
    async register(@Body() body: RegisterBodyDto) {
        return await this.authService.register(body);
    }

    @Post('login')
    async login(@Body() body: LoginBodyDto) {
        return new LoginResDto(await this.authService.login(body));
    }
}
