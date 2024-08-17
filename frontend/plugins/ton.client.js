// import { onMounted } from '#app';
// import { defineNuxtPlugin } from 'nuxt';
import { TonConnectUI } from '@tonconnect/ui';

export default defineNuxtPlugin(async (nuxtApp) => {
    const tonConnect = new TonConnectUI({
        manifestUrl: "https://valton.fun/tonconnect-manifest.json",
    });
    
    if (!tonConnect.connected) {
        tonConnect.setConnectRequestParameters({
            state: "loading",
        });

        const res = await fetch(`${useRuntimeConfig().public.baseURL}${'/auth/ton-proof/generatePayload'}`, {method: "GET"})
        const tonProofPayload = await res.text();

        if (tonProofPayload) {
            tonConnect.setConnectRequestParameters({
                state: "ready",
                value: { tonProof: tonProofPayload },
            });
        }
    }

    nuxtApp.tonConnect = tonConnect;
});
