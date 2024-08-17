import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users.model";

export class AllInfoUserDto {
    @ApiProperty({type: User, description: "В том числе и liked"})
    user: User;

    @ApiProperty({type: String, example: "1.4", description: "Количество ton на кошельке в привычном формате"})
    balance: string;
}