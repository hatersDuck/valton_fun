import { HttpException, HttpStatus } from '@nestjs/common';
import { Address } from '@ton/core';

export class FitonAddress {
    constructor (){}

    static getAddress(address: string): Address {
        if (Address.isRaw(address) || Address.isFriendly(address)) {
            return Address.parse(address)
        } else {
            throw new HttpException('Неверный адрес смарт-контракта или кошелька!(fi)', HttpStatus.BAD_REQUEST)
        }
    }

    static validStringAddress(address: string): string{
        return (this.getAddress(address)).toString({
            urlSafe: true, 
            bounceable: true, 
            testOnly: false
        });
    }
}
