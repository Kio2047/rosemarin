import type { LoginForm, RegisterForm } from "../types/formTypes";

const BASE_URL = 'http://localhost:3001';

export const register = async (user: RegisterForm) => {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            },
            credentials: 'include'
        });
        return response.ok;

    } catch (err) {
        console.log(err);
    }
 }

export const login = async (user: LoginForm) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            },
            credentials: 'include'
        });
        return await response.json();

    } catch (err) {
        console.log(err);
    }
}

export const profile = async () => {
    try {
        const response = await fetch(`${BASE_URL}/me`, {
            method: 'GET',
            credentials: 'include'
        })
        return await response.json();


    } catch (err) {
        console.log(err);
    }
}

export const logout = async () => {
    try {
        const response = await fetch(`${BASE_URL}/logout`, {
            method: 'GET',
            credentials: 'include'
        })
        return response.ok;

    } catch (err) {
        console.log(err);
    }
}