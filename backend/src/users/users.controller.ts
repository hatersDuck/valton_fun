import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User } from './users.model';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUser } from './dto/update-user.dto';
import { AddressGuard } from 'src/auth/auth-address.guard';
import { CustomType } from 'src/auth/auth-type.decorator';
import { AllInfoUserDto } from './dto/all-info-user.dto';

@ApiTags("Пользователи")
@Controller('user')
export class UsersController {

    constructor(private usersService: UsersService){}

    @ApiOperation({summary: "Взять данные о пользователе (без NFT)"})
    @ApiResponse({status: 200, type: User})
    @Get("/get/:address")
    async getOneUser(@Param('address') address:string){
        return this.usersService.findOne(address);
    }

    @ApiBearerAuth()
    @ApiOperation({summary: "Обновить что-либо"})
    @ApiResponse({status: 200, type: String})
    @UseGuards(AddressGuard)
    @CustomType('Wallet')
    @Put("/update/")
    async updateUser(@Body() updateDto: UpdateUser){
        return this.usersService.update(updateDto);
    }

    @ApiBearerAuth()
    @ApiOperation({summary: "Взять всю инфу"})
    @ApiResponse({status: 200, type: AllInfoUserDto})
    @CustomType('Wallet')
    @Get("/allInfo/:address")
    async getAllInfo(@Param("address") address: string){
        return this.usersService.allInfo(address);
    }
}
