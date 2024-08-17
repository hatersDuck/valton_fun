import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode, TupleBuilder } from '@ton/core';

export type InsuranceConfig = {
    count_nft: bigint;
};

export function insuranceConfigToCell(config: InsuranceConfig): Cell {
    const bld = beginCell();
    bld.storeUint(config.count_nft, 32);
    return bld.endCell();
}

export class Insurance implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Insurance(address);
    }

    static createFromConfig(config: InsuranceConfig, code: Cell, workchain = 0) {
        const data = insuranceConfigToCell(config);
        const init = { code, data };
        return new Insurance(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
    async send(provider: ContractProvider, via: Sender, value: bigint, body: Cell) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: body,
        });
    }

    async getVotes(provider: ContractProvider) {
        const result = (await provider.get('get_votes', [])).stack;
        return result;
    }
    async getInfoInsurance(provider: ContractProvider) {
        const result = (await provider.get('get_info_insurance', [])).stack;
        return result;
    }

    async getEmpty(provider: ContractProvider) {
        const result = (await provider.get('get_test', [])).stack;
        return result;
    }

    async getData(provider: ContractProvider) {
        const result = (await provider.get('get_datas', [])).stack;
        return result;
    }

    async getCopy(provider: ContractProvider, copyCell: Cell) {
        const builder = new TupleBuilder()
        builder.writeCell(copyCell)
        const result = (await provider.get('get_copy', builder.build())).stack;
        return result;
    }
}
