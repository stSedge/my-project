import React, { useState } from 'react';
import axios from '../axiosConfig.ts';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAge, setDiscount, setGender, setJwt, setName, setTotalSum, setEmail } 
    from '../reducer/UserStore/index.ts';
import { setIsAuth } from '../reducer/UserStore/index.ts';

const AuthForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const params = new URLSearchParams();
            params.append('username', email);
            params.append('password', password);

            const response = await axios.post('/token', params, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });
            dispatch(setJwt(response.data.access_token));
            dispatch(setIsAuth(true));
            const response1 = await axios.get(`/api/user_email/${email}`);
            console.log(response1.data.email);
            dispatch(setName(response1.data.name));
            dispatch(setGender(response1.data.gender));
            dispatch(setAge(response1.data.age));
            dispatch(setDiscount(response1.data.discount));
            dispatch(setTotalSum(response1.data.total_sum));
            //dispatch(setEmail(response1.data.emailil));

            navigate('/home');
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
    

    return (
        <div>
            <h1>Авторизация</h1>
            <form onSubmit={handleSubmit}>
                <h2>Войдите, если у вас уже есть аккаунт </h2>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default AuthForm;