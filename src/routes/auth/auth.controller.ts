import { Body, ClassSerializerInterceptor, Controller, Post, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { RegisterBodyDto, RegisterResDto } from 'src/routes/auth/auth.dto';
import { AuthService } from 'src/routes/auth/auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @SerializeOptions({ type: RegisterResDto })
    @Post('register')
    register(@Body() body: RegisterBodyDto) {
        return this.authService.register(body);
    }
}
