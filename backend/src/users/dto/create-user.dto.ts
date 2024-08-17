import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: "EQChyNfRCa7qCOtlRhjTbEi3Ok_IPnMXhlHyLjzqq27QXOaG", description: "Адрес кошелька пользователя"})
    readonly address: string;
    @ApiProperty({required: false, example: "@durov", description: "Никнейм пользователя в тг или ничего, можно ещё id"})
    readonly telegram: null | string;
    @ApiProperty({required: false, example: "false", description: "mainet/testnet"})
    readonly mainnet: null | boolean;
}