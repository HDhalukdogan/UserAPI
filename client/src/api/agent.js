import axios  from "axios";

axios.defaults.baseURL = 'http://localhost:5000/api/';


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
}

const agent = {
    Account
}

export default agent;