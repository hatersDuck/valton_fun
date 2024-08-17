import { ApiProperty } from "@nestjs/swagger";
import { Model, Column, DataType, Table, BelongsTo, HasMany, BelongsToMany } from "sequelize-typescript";


interface UserCreationAttributes {
    address: string;
    telegram: string | null;
}


@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttributes> {
    @ApiProperty({ example: "1", description: "id пользователя в базе данных" })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ example: "EQChyNfRCa7qCOtlRhjTbEi3Ok_IPnMXhlHyLjzqq27QXOaG", description: "Адрес контракта." })
    @Column({ type: DataType.STRING, unique: true })
    address: string;

    @ApiProperty({ example: "false", description: "mainnet/testnet", default: "-239 == mainnet, -3 == testnet" })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    mainnet: boolean;

    @ApiProperty({ example: "default_avatar.png", description: "Путь до аватара.", default: "default_avatar.png" })
    @Column({ type: DataType.STRING, allowNull: true, defaultValue: "default_avatar.png" })
    img_avatar: string;
    @ApiProperty({ example: "default_banner.png", description: "Путь до баннера.", default: "default_banner.png" })
    @Column({ type: DataType.STRING, allowNull: true, defaultValue: "default_banner.png" })
    img_banner: string;
    @ApiProperty({ example: "Занимаюсь ", description: "Описание на странице пользователя.", default: "" })
    @Column({ type: DataType.STRING, allowNull: true, defaultValue: "" })
    description: string;
    @ApiProperty({ example: "@durov", description: "Имя пользователя в телеграм.", default: "undefined" })
    @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
    telegram: string;

    @ApiProperty({
        type: 'json', example: `{
        "X": "https://twitter.com/durov",
        "telegram": "https://t.me/durov",
        "instagram": "https://www.instagram.com/durov",
        "other...": "https://example.com/isq"
    }`, description: "Ссылки до соц. сетей пользователя", default: "{}"
    })
    @Column({ type: DataType.JSON, defaultValue: {} })
    links: any;

    @ApiProperty({ type: Number, example: 0.562, description: "Сколько процентов от вклада защищенно (потенциальная сумма выплат за страховку/сумма покупки застрахованных на данный момент nft).", default: 0 })
    @Column({ type: DataType.FLOAT, defaultValue: 0 })
    protection_score: number;
}