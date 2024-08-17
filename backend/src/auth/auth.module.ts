import { Get, Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_SECRET, EXPIRES_IN } from 'src/constants';
import { UsersModule } from 'src/users/users.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({
            secret: AUTH_SECRET,
            signOptions: {
                expiresIn: EXPIRES_IN
            }
        })
    ],
    exports: [
        JwtModule,
        AuthService
    ]
})
export class AuthModule { }
