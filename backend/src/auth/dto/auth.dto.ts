import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.model";


export class AuthDto{
    @ApiProperty({type: User, description: "Информация о пользователе"})
    user: User;
    @ApiProperty({type: String, description: "Токен авторизации jwt Bearer"})
    token: string;
}
