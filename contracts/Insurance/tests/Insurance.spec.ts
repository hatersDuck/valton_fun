import { Blockchain, SandboxContract, SmartContract, TreasuryContract } from '@ton/sandbox';
import { Builder, Cell, beginCell, contractAddress, storeStateInit, toNano } from '@ton/core';
import { Insurance, StateInit, storeTransfer } from '../wrappers/Insurance';
import '@ton/test-utils';
import { randomInt } from 'crypto';
import { AccountStateActive } from '@ton/core/dist/types/AccountState';

const COUNT_NFT : number = 10

const nft_collection_code : string = "te6ccgECEgEAAuUAART/APSkE/S88sgLAQIBYgIDAgLOBAUCASAQEQIBIAYHAgEgDg8E9wyIccAkl8D4NDTAwFxsJJfA+D6QPpAMfoAMXHXIfoAMfoAMPACBbOOFltsIjRSMscF8uGVAfpA1PpAMBA08APgB9Mf0z+CEF/MPRRSMLqOijIQSBA3ECYQRQLgghAvyyaiUjC64wKCEBwEQSpSMLqOijIQSBA3ECYQRQKAICQoLABE+kQwcLry4U2AB9lE2xwXy4ZH6QCHwAfpA0gAx+gCCCvrwgByhIZRTFaCh3iLXCwHDACCSBqGRNuIgwv/y4ZIhjj6CEAUTjZHIUArPFlAMzxZxJEoUVEawcIAQyMsFUAfPFlAF+gIVy2oSyx/LPyJus5RYzxcBkTLiAckB+wAQWJQQKzhb4gwAgBNfAzMzNDRwghCLdxc1BMjL/1jPFkQwEoBAcIAQyMsFUAfPFlAF+gIVy2oSyx/LPyJus5RYzxcBkTLiAckB+wAB9lE0xwXy4ZH6QCHwAfpA0gAx+gCCCvrwgByhIZRTFaCh3iLXCwHDACCSBqGRNuIgwv/y4ZIhjj6CEFEaRGPIUAjPFlAMzxZxJEgUVEaQcIAQyMsFUAfPFlAF+gIVy2oSyx/LPyJus5RYzxcBkTLiAckB+wAQOJQQKzZb4g0ARuAxNjc3ghAaC51RFrqeUTHHBfLhmgHUMEQA8APgXwaED/LwAIICjjUn8AGCENUydtsQOEUAbXFwgBDIywVQB88WUAX6AhXLahLLH8s/Im6zlFjPFwGRMuIByQH7AJMwMzXiVQPwAwCCAo41J/ABghDVMnbbEDhIAG1xcIAQyMsFUAfPFlAF+gIVy2oSyx/LPyJus5RYzxcBkTLiAckB+wCTMDYw4lUD8AMAQTtRNDTP/pAINdJwgCcfwH6QNT6QDAQNRA04DBwWW1tbYAAlATIyz9QA88WAc8WzAHPFsntVIAANvwOngBNijAALvH5/gBGE"

describe('Insurance', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let insurance: SandboxContract<Insurance>;
    const NFTS : Array<SmartContract> = []
    const code = Cell.fromBase64(nft_collection_code);

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');
        
        for (let i = 0; i < COUNT_NFT; i++) {
            const data = beginCell()
                                .storeUint(i, 64)                   // index
                                .storeAddress(deployer.address)     // collection address
                                .storeAddress(deployer.address)     // owner address
                                .storeStringRefTail("test_" + String(i))         // content
                                .storeAddress(deployer.address)     // editor address
                                .endCell();
            const address = contractAddress(0, {
                code: code,
                data: data
            })
            await deployer.send({
                value: toNano("0.1"),
                to: address,
                init: {
                    code: code,
                    data: data
                }
            })
        
            NFTS.push(await blockchain.getContract(address))
        }
        
        insurance = blockchain.openContract(await Insurance.fromInit(
            2050n, 
            BigInt(randomInt(2048)), 
            deployer.address, 
            code, 
            0n,
            64n,
            0n
        ));
        const deployResult = await insurance.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: insurance.address,
            deploy: true,
            success: true,
        });
        for (let i = 0; i < COUNT_NFT; i++) {
            const accState : any = NFTS[i].accountState;
            const body_bld : Builder = beginCell();
            body_bld.storeUint(1607220500, 32);
            body_bld.storeUint(0n, 64);
            body_bld.storeAddress(insurance.address);
            body_bld.storeAddress(null);
            body_bld.storeBit(false);
            body_bld.storeCoins(toNano("0.1"));
            body_bld.storeBuilder(beginCell().storeRef(accState.state.data.asBuilder()));
            await deployer.send({
                to: NFTS[i].address,
                value: toNano("0.15"),
                body: body_bld.endCell()
            })
        }
        let voteCell =  await insurance.getVotesCells()
        let s = voteCell?.beginParse();
        s?.loadBit();
        console.log(s?.loadUint(256))
        const accState : any = NFTS[0].accountState;
        const body_bld : Builder = beginCell();
        body_bld.storeUint(1607220500, 32);
        body_bld.storeUint(0n, 64);
        body_bld.storeAddress(insurance.address);
        body_bld.storeAddress(null);
        body_bld.storeBit(false);
        body_bld.storeCoins(toNano("0.1"));
        body_bld.storeBuilder(beginCell().storeRef(accState.state.data.asBuilder()));
        await deployer.send({
            to: NFTS[0].address,
            value: toNano("0.15"),
            body: body_bld.endCell()
        })
        voteCell =  await insurance.getVotesCells()
        s = voteCell?.beginParse();
        s?.loadBit();
        console.log(s?.loadUint(256));
        // console.log(await insurance.getVotesCell())
        // console.log(await insurance.getVote(0n))
        // console.log(await insurance.getVote(2049n))
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and insurance are ready to use
    });
});
