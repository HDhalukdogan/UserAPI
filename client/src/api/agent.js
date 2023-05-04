import axios  from "axios";
import { store } from "store";

axios.defaults.baseURL = 'http://localhost:5000/api/';


axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const responseBody = (response) => response.data;

const request = {
    get: (url, params) => axios.get(url, {params}).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    delete: (url) => axios.delete(url).then(responseBody),
    postForm: (url, data) => axios.post(url, data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody),
    putForm: (url, data) => axios.put(url, data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody)
}

const Account = {
    login: (values) => request.post('account/login', values),
    register: (values) => request.post('account/register', values),
    currentUser: () => request.get('account/currentUser'),
    getAllUser: ()=>request.get("account/getAllUser"),
    forgotPassword: (values) => request.post('account/forgotPassword', values),
    resetPassword: (values) => request.post('account/resetPassword', values),
}

const agent = {
    Account
}

export default agent;