import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { useTonClient } from 'src/fiton/ton.client';
import { Address, fromNano } from '@ton/core';
import { AllInfoUserDto } from './dto/all-info-user.dto';


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userRepository: typeof User,
    ) { }

    async createUser(dto: CreateUserDto) {
        return await this.userRepository.create(dto)
    }

    async findAll() {
        return await this.userRepository.findAll();
    }

    async findOne(address: string) {
        return await this.userRepository.findOne({
            where: {
                address,
            }
        });
    }

    async findOneAllInfo(address: string) {
        return await this.userRepository.findOne({
            where: {
                address,
            }, include: {all: true}
        })
    }
    async remove(address: string): Promise<void> {
        const user = await this.findOne(address);
        await user.destroy();
    }
    
    async balance(address: string, mainnet: boolean) {
        const client = await useTonClient(mainnet);
        return fromNano(await client.getBalance(Address.parse(address)))
    }

    async allInfo(address: string): Promise<AllInfoUserDto> {
        const rtn = new AllInfoUserDto;

        rtn.user = await this.findOneAllInfo(address)
        rtn.balance = await this.balance(address, rtn.user.mainnet)
        return rtn;
    }



    async update(userDto: UpdateUser): Promise<User | null> {
        const address = userDto.address;

        try {
            const user = await this.findOne(address);

            if (user) {
                user.img_avatar = userDto.img_avatar ?? user.img_avatar;
                user.img_banner = userDto.img_banner ?? user.img_banner;
                user.description = userDto.description ?? user.description;
                user.telegram = userDto.telegram ?? user.telegram;
                user.links = userDto.links ?? user.links;

                await user.save();
                return user;
            }

            throw new HttpException("Не удалось найти пользователя", HttpStatus.BAD_REQUEST);
        } catch (error) {
            // Обработка ошибки
            console.error('Error updating user:', error);
            throw error;
        }
    }
}