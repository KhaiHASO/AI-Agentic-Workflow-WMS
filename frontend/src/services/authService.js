import axios from 'axios';

const API_URL = 'http://localhost:5167/api/Auth/';

const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL + 'login', {
            email,
            password
        });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Login failed';
    }
};

const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const getToken = () => {
    return localStorage.getItem('token');
};

const authService = {
    login,
    logout,
    getCurrentUser,
    getToken
};

export default authService;
