import React, { useState } from 'react';
import axios from '../../axiosConfig.ts';

export const [email, setEmail] = useState<string>('');
const [password, setPassword] = useState<string>('');
const [error, setError] = useState<string>('');


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);

        const response = await axios.post('/token', params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        
        localStorage.setItem('jwtToken', response.data.access_token);
        window.location.href = '/flowers';
    } catch (error) {
        if (error.response) {
            console.log('Error response:', error.response);
            if (error.response.status === 422) {
                alert('Неверные данные или формат.');
            }
        } else {
            console.error('Error', error.message);
        }
    }
};