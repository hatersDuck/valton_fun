
export async function api(
    route: string = "/",
    method: string = 'GET',
    params: any = null,
    headers: [string, string][] = [],
    host: string = useRuntimeConfig().public.baseURL
): Promise<any | string> {
    let url = `${host}${route}`;
    const options: RequestInit = {
        method: method,
        headers: headers,
    };

    if (method.toUpperCase() !== 'GET' && params instanceof FormData) {
        options.body = params;
    } else if (!!params) {
        if (method.toUpperCase() === 'GET') {
            const urlParams = new URLSearchParams(params);
            url += `?${urlParams.toString()}`;
        } else {
            options.headers = { ...options.headers, 'Content-Type': 'application/json' };
            options.body = JSON.stringify(params);
        }
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json();
        } else {
            return response.text();
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
    return
}