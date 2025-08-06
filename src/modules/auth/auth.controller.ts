import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    @ApiOperation({ summary: 'Criar um novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
    signup(@Body() dto: SignUpDto) {
        return this.authService.signup(dto);
    }
    @ApiOperation({ summary: 'Login em usuário' })
    @ApiResponse({ status: 200, description: 'Login realizado com sucesso.' })
    
    @Post('signin')
    @HttpCode(200)
    signin(@Body() dto: SignInDto) {
        return this.authService.signin(dto);
    }
}
