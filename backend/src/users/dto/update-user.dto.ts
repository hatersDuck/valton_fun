import { ApiProperty } from "@nestjs/swagger";

export class UpdateUser {
    @ApiProperty({required: true, example: "EQDVxgzu_SiFhGmCjDKwJfZFbOnUy1ZgcaKtHNhS9_7dY6gC", description: "Адрес кошелька пользователя"})
    readonly address: string;

    @ApiProperty({required: false, example: "img/default_avatar.png", description: "Путь до аватара."})
    readonly img_avatar: string| null ;
    
    @ApiProperty({required: false, example: "img/default_banner.png", description: "Путь до баннера."})
    readonly img_banner: string| null;
    
    @ApiProperty({required: false, example: "Вкладываю деньги только там где 50%+ страховки", description: "Описание у пользователя."})
    readonly description: string| null;
    
    @ApiProperty({required: false, example: "@durov", description: "Имя пользователя в телеграм."})
    readonly telegram: string| null;
    
    @ApiProperty({type: 'json', required: false, example: {
            "X": "https://twitter.com/durov",
            "telegram": "https://t.me/durov",
            "instagram": "https://www.instagram.com/durov",
            "other...": "https://required: false, example.com/isq"
        }, description: "Ссылки до соц. сетей пользователя"})
    readonly links: any| null;
}