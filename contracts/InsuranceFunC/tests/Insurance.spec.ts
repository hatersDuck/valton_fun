import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { BitString, Builder, Cell, beginCell, toNano } from '@ton/core';
import { Insurance } from '../wrappers/Insurance';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';
import { InsuranceJS } from './algo';
import { randomInt } from 'crypto';

const COUNT_NFT = BigInt(randomInt(20000));

describe('Insurance', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Insurance');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let insurance: SandboxContract<Insurance>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        insurance = blockchain.openContract(Insurance.createFromConfig({
            count_nft: COUNT_NFT
        }, code));

        deployer = await blockchain.treasury(String(COUNT_NFT));

        const deployResult = await insurance.sendDeploy(deployer.getSender(), toNano('1.5'));
        //console.log(await insurance.getData());
        //const transactions =  await insurance.send(deployer.getSender(), toNano('0.1'), beginCell().storeUint(100, 32).endCell());
        //console.log(await insurance.getData());
        console.log(await insurance.getData())
        console.log(await insurance.getCopy(beginCell().storeUint(100, 256).storeUint(200, 252).endCell()))
        // console.log(await insurance.getInfoInsurance())
        // console.log(await insurance.getEmpty())
        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: insurance.address,
            deploy: true,
        });
    });

    it('should votes', async () => {
        // const votes = new InsuranceJS(Number(COUNT_NFT));
        // console.log(votes.cntCells)
        // console.log(votes.getCell())
        // console.log(votes.getCell())
        // console.log(votes.vote(10220))
        // console.log(votes.vote(10219))

        // const mx = Buffer.from((BigInt(1) << BigInt(1022)).toString(2).padStart(1023, '0'), 'hex')
        // const bStr = new BitString(mx, 0, mx.byteLength*8)
        // console.log(BigInt(bStr.toString()))
        // const f = BigInt(bStr.toString()) ^ (BigInt(1) << BigInt(1021))

        // console.log((f & (BigInt(1) << BigInt(1022))))
        // console.log((f & (BigInt(1) << BigInt(1021))))
    })
})