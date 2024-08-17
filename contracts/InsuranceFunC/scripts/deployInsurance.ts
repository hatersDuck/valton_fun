import { toNano } from '@ton/core';
import { Insurance } from '../wrappers/Insurance';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const insurance = provider.open(Insurance.createFromConfig({}, await compile('Insurance')));

    await insurance.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(insurance.address);

    // run methods on `insurance`
}
