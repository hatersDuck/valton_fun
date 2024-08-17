import { ApiProperty } from "@nestjs/swagger";

export class DomainProof {
    @ApiProperty({required: true, description: "Данные о размере байтов сайта", example: "10" })
    lengthBytes: number;
    @ApiProperty({required: true, description: "Сайт", example: "valton.fun" })
    value: string;
}

export class Proof {
    @ApiProperty({required: true, example: '{"lengthBytes": 10, "value":"valton.fun" }', description: "Сайт" })
    domain: DomainProof
    @ApiProperty({required: true, example: "071142207085246b54e4eab512ac2b37c3598b71160e2a8557284bb9fc4cfb8a", description: "Временный payload" })
    payload: string
    @ApiProperty({required: true, example: "FdyXeQtICrbfKY5+53njfE1ElzVIoVCNE7abKBPxiiG8XLNca6v8RV9QnctmwHi2xF3rGpvHnp1GDAUlPn5WBA==", description: "По факту юзелес" })
    signature: string
}

export class TonProofDto {
    @ApiProperty({required: true, example: '0:d5c60ceefd28858469828c32b025f6456ce9d4cb566071a2ad1cd852f7fedd63', description: "Адрес кошелька пользователя" })
    address: string;
    @ApiProperty({required: true, example: '-3', description: "Сеть пользователя -3 tesnet -269 mainet" })
    chain: string;
    @ApiProperty({required: true, description: "Код кошелька пользователя" })
    walletStateInit: string;
    @ApiProperty({required: true, description: "Публичный ключ кошелька" })
    publicKey: string;
    @ApiProperty({required: true, description: "Определение достоверности" })
    proof: Proof;
}