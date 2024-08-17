import { HttpException, HttpStatus } from "@nestjs/common";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { Address, Builder, SenderArguments, TonClient, TupleBuilder, TupleReader } from "@ton/ton";

export async function useTonClient(mainnet: boolean): Promise<TonClient> {
    return new TonClient({
        endpoint: await getHttpEndpoint({
            network: mainnet ? "mainnet" : "testnet"
        })
    })
}

export async function senderInfo(args: SenderArguments) {
   return {
        address: args.to.toString(),
        amount: args.value.toString(),
        payload: args.body?.toBoc().toString("base64")
   }
}


export async function getMethodBlockchain(address: string, mainnet: boolean, getter: string, builder: TupleBuilder | null = null) : Promise<TupleReader> {
    const client = await useTonClient(mainnet);
    try{
        let source: TupleReader;
        if (builder !== null){
            source = (await client.runMethod(Address.parse(address), getter, builder.build())).stack;
        } else {
            source = (await client.runMethod(Address.parse(address), getter)).stack;
        }
        
        return source;
    } catch (err) {
        switch (err.message.split(" ").pop()) {
            case "11":
                throw new HttpException(`В контракте нету ${getter} функции`, HttpStatus.BAD_REQUEST)
            case "2":
                throw new HttpException("Аргументы к get функции не указаны или указаны неверно", HttpStatus.BAD_REQUEST)
            default:
                console.log(err)   
                throw new HttpException("Неизвестная ошибка", HttpStatus.BAD_REQUEST)
        }
    }
}