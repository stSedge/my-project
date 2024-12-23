import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAge, setDiscount, setGender, setJwt, setName, setTotalSum, setEmail } from '../../reducer/UserStore/index';
import { setIsAuth } from '../../reducer/UserStore/index';
import { authenticateUser, getUserData } from './AuthFormThunks'; 

const AuthFormUI: React.FC = () => {
    const [email, setEmail] = useState<string>(''); 
    const [password, setPassword] = useState<string>(''); 
    const [error, setError] = useState<string>(''); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const accessToken = await authenticateUser(email, password);
            dispatch(setJwt(accessToken));
            dispatch(setIsAuth(true));

            const userData = await getUserData(email);
            
            dispatch(setName(userData.name));
            dispatch(setGender(userData.gender));
            dispatch(setAge(userData.age));
            dispatch(setDiscount(userData.discount));
            dispatch(setTotalSum(userData.total_sum));
            //dispatch(setEmail(userData.email));

            navigate('/home');
        } catch (error: any) {
            if (error.response) {
                console.log('Error response:', error.response);
                if (error.response.status === 422) {
                    alert('Неверные данные или формат.');
                } else {
                    setError('Произошла ошибка при авторизации');
                }
            } else {
                setError('Ошибка при соединении с сервером');
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

export default AuthFormUI;
