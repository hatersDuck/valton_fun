import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CheckPayload, GeneratePayload } from './auth-payload';
import { TonProofDto } from './dto/ton-proff.dto';
import { TONPROOF_PAYLOAD_SIGNATURE_KEY, STATUS_PAYLOAD } from 'src/constants';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { FitonAddress } from 'src/fiton/fiton.address';
import { CHAIN } from '@tonconnect/sdk';

@Injectable()
export class AuthService {

	constructor(private usersSevice: UsersService,
				private jwtService: JwtService){}

	async generateTonPayload(secret: string, ttl: number) : Promise<string>{
		return GeneratePayload(secret, ttl)
	}

	async login(tonProof: TonProofDto): Promise<AuthDto>{
		const payloadStatus = CheckPayload(tonProof.proof.payload, TONPROOF_PAYLOAD_SIGNATURE_KEY)
		if (payloadStatus > 0) {
			throw new HttpException(STATUS_PAYLOAD[payloadStatus], HttpStatus.BAD_REQUEST);
		}
		tonProof.address = FitonAddress.validStringAddress(tonProof.address)
		let user = await this.usersSevice.findOne(tonProof.address);

		if (!user){
			const newUser = await this.usersSevice.createUser({
				address: tonProof.address,
				telegram: null,
				mainnet: tonProof.chain === CHAIN.MAINNET ? true : false
			})

			user = newUser;
		}

		const token = await this.generateToken(user.address, tonProof.publicKey, user.mainnet)
		return {user: user, token: token};
	}

	private async generateToken(address: string, publicKey: string, mainnet: boolean){
		const payload = {address: address, publicKey: publicKey, mainnet: mainnet}
		return this.jwtService.sign(payload)
	}
}
