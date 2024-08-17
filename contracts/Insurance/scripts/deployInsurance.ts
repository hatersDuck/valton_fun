import { toNano } from '@ton/core';
import { Insurance } from '../wrappers/Insurance';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const insurance = provider.open(await Insurance.fromInit());

    await insurance.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(insurance.address);

    // run methods on `insurance`
}
