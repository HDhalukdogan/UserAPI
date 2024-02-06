import { auth } from "@/auth";

const baseUrl = process.env.API_URL;

async function get(url: string) {
    const requestOptions = {
        method: 'GET',
        headers: await getHeaders()
    }
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response)
}
async function getBase64(url: string) {
    const requestOptions = {
        method: 'GET',
        headers: await getHeaders()
    }
    const response = await fetch(baseUrl + url, requestOptions);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const header = response.headers.get('Content-Disposition');
    let filename;
    if (header) {
        const parts = header.split(';');
        filename = parts[1].split('=')[1];
    }

    const contentType = response.headers.get('Content-Type');

    const arrayBuffer = await response.arrayBuffer();
    const base64 = btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    return { base64, filename, contentType };
}
async function post(url: string, body: {}) {
    const requestOptions = {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response)
}
async function postFormData(url: string, body: FormData) {
    const requestOptions = {
        method: 'POST',
        headers: await getHeadersFormData(),
        body: body
    }
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response)
}
async function put(url: string, body: {}) {
    const requestOptions = {
        method: 'PUT',
        headers: await getHeaders(),
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response)
}
async function del(url: string) {
    const requestOptions = {
        method: 'DELETE',
        headers: await getHeaders()
    }
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response)
}

async function getHeaders() {
    const session = await auth();
    const headers = { 'Content-type': 'application/json' } as any;
    if (session?.user.access_token) {
        headers.Authorization = 'Bearer ' + session?.user.access_token
    }
    return headers
}
async function getHeadersFormData() {
    const session = await auth();
    const headers: any = {};
    if (session?.user.access_token) {
        headers.Authorization = 'Bearer ' + session?.user.access_token
    }
    return headers
}

async function handleResponse(response: Response) {
    const text = await response.text();

    let data;

    try {
        data = JSON.parse(text);
    } catch (error) {
        data = text;
    }

    if (response.ok) {
        return data || response.statusText;
    } else {
        const error = {
            status: response.status,
            message: typeof data === 'string' ? data : response.statusText
        }
        return { error };
    }
}


export const fetchWrapper = {
    get,
    getBase64,
    post,
    postFormData,
    put,
    del
}
