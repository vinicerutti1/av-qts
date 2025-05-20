import axios from 'axios';
import { AuthResponse, User } from './types';

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });

        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const register = async (
    name: string,
    email: string,
    password: string,
): Promise<AuthResponse> => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });

        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

export const getCurrentUser = async (token: string): Promise<AuthResponse['user']> => {
    try {
        const response = await axios.get(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error('Get user error:', error);
        throw error;
    }
};

export const validateToken = async (token: string): Promise<User> => {
    try {
        const response = await axios.get(`${API_URL}/auth/validate`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.user;
    } catch (error) {
        console.error('Token validation error:', error);
        throw error;
    }
};

export const refreshToken = async (oldToken: string): Promise<string> => {
    try {
        const response = await axios.post(
            `${API_URL}/auth/refresh`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${oldToken}`,
                },
            },
        );

        return response.data.token;
    } catch (error) {
        console.error('Error refreshing token', error);
        throw error;
    }
};
