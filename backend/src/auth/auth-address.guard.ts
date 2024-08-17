	import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
	import { Reflector } from '@nestjs/core';
	import { Observable } from 'rxjs';
	import { JwtService } from '@nestjs/jwt';
	import { UsersService } from 'src/users/users.service';
	import { Address } from '@ton/core';
	import { FitonAddress } from 'src/fiton/fiton.address';

	@Injectable()
	export class AddressGuard implements CanActivate {
		constructor(
			private readonly reflector: Reflector, 
			private readonly jwtService: JwtService, 
			private readonly usersService: UsersService) {}

		canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
			const request = context.switchToHttp().getRequest();
			const type = this.reflector.get<string>('custom:type', context.getHandler());
			let address: string
			try{
				address = FitonAddress.validStringAddress(request.body.address) || FitonAddress.validStringAddress(request.Param?.address);
			} catch (error) {
				throw new UnauthorizedException('Не правильный адрес в параметре или в теле запроса')
			}
			const authHeader = request.headers.authorization;
			
			if (!authHeader || !authHeader.startsWith('Bearer ')) {
				throw new UnauthorizedException('Пользователь не авторизован');
			}
			
			const jwtToken = authHeader.split(' ')[1];

			if (!jwtToken) {
				throw new UnauthorizedException("Пустой токен"); 
			}

			try {
				if (type === "Wallet"){
					const decodedToken = this.jwtService.decode(jwtToken);
					if (decodedToken.address === address) {	
						return true;
					} else {
						throw new UnauthorizedException('Пользователь не имеет доступа для редактирования этого адреса');
					}
				}
				// TODO
				if (type === "Collection"){

				}

				if (type === "NFT"){

				}

			} catch (error) {
				console.log(error)
				throw new UnauthorizedException("Токен не действителен"); 
			}
			
		}
	}
