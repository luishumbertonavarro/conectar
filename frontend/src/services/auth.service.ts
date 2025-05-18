import axios from '../api/axios';

const TOKEN_KEY = 'token';

export const authService = {
    login: async (email: string, password: string) => {
        const response = await axios.post('/auth/login', { email, password });
        const token = response.data.access_token;
        localStorage.setItem(TOKEN_KEY, token);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
    },

    getToken: () => {
        return localStorage.getItem(TOKEN_KEY);
        
    },

    getProfile: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) throw new Error('No token found');

        const response = await axios.get('/users/profile', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },
};
