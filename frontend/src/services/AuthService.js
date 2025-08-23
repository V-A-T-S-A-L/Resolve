import axios from 'axios';

export const registerService = (body) => axios.post('http://localhost:8080/api/auth/register', body);

export const loginService = (body) => axios.post('http://localhost:8080/api/auth/login', body);