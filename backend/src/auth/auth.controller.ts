import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { STATUS_PAYLOAD, TONPROOF_PAYLOAD_LIFETIME_SEC, TONPROOF_PAYLOAD_SIGNATURE_KEY } from 'src/constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TonProofDto } from './dto/ton-proff.dto';
import { AuthDto } from './dto/auth.dto';

@ApiTags("Авторизация")
@Controller('auth')

export class AuthController {
    constructor(private authService: AuthService){}

    @ApiOperation({summary: "Получить временный payload."})
    @ApiResponse({status: 200, type: String})
    @Get("/ton-proof/generatePayload")
    generatePayload(){
        return this.authService.generateTonPayload(TONPROOF_PAYLOAD_SIGNATURE_KEY, TONPROOF_PAYLOAD_LIFETIME_SEC);
    }

    @ApiOperation({summary: "Авторизация и аунтефикация пользователя"})
    @ApiResponse({status: 400, description: 'Ошибка при проверке Ton Payload'})
    @ApiResponse({status: 200, type: AuthDto})
    @Post("/login")
    checkPayload(@Body() tonProof: TonProofDto){
        try {
            return this.authService.login(tonProof);
        } catch (error) {
            throw error;
        }
    }
}
