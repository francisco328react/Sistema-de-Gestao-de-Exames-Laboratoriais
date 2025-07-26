import axios from 'axios';

const API = 'http://localhost:3000';

export async function login(email: string, senha: string) {
    const response = await axios.post(`${API}/login`, { email, senha });
    return response.data;
}

export async function register(nome: string, email: string, senha: string) {
    const response = await axios.post(`${API}/register`, { nome, email, senha });
    return response.data;
}