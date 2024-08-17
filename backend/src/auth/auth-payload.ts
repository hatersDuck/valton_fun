import { createHmac, randomFillSync, timingSafeEqual, subtle, randomBytes } from 'crypto';

export function GeneratePayload(secret: string, ttl: number): string {
    const payload = Buffer.alloc(48);
    const nonce = randomBytes(8);
    const expiry = Math.floor(Date.now() / 1000) + ttl;

    nonce.copy(payload, 0);
    payload.writeBigUInt64BE(BigInt(expiry), 8);

    const hmac = createHmac('sha256', secret);
    hmac.update(payload.subarray(0, 16));
    const signature = hmac.digest();

    signature.copy(payload, 16);

    return payload.subarray(0, 32).toString('hex');
}

export function CheckPayload(payload: string, secret: string): number {
    const decodedPayload = Buffer.from(payload, 'hex');
    if (decodedPayload.length !== 32) {
        return 1;
    }

    const signature = decodedPayload.subarray(16);
    const expectedSignature = createHmac('sha256', secret)
        .update(decodedPayload.subarray(0, 16))
        .digest();

    if (!signature.equals(expectedSignature.subarray(0, 16))) {
        return 2;
    }

    const expiry = decodedPayload.readBigUInt64BE(8);

    if (expiry < BigInt(Math.floor(Date.now() / 1000))) {
        return 3;
    }

    return 0;
}