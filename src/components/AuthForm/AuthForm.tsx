import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAge, setDiscount, setEmail, setGender, setId, setIsAdmin, setJwt, setName, setTotalSum } from '../../reducer/UserStore/index';
import { setIsAuth } from '../../reducer/UserStore/index';
import { authenticateUser, getUserData } from './AuthFormThunks'; 

const AuthFormUI: React.FC = () => {
    const [email, setUserEmail] = useState<string>(''); 
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

            const userData = await getUserData(email, accessToken);
            
            dispatch(setName(userData.name));
            dispatch(setGender(userData.gender));
            dispatch(setAge(userData.age));
            dispatch(setDiscount(userData.discount));
            dispatch(setTotalSum(userData.total_sum));
            dispatch(setEmail(email));
            dispatch(setIsAdmin(userData.is_admin));
            dispatch(setId(userData.id));
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
        <div className="container mt-5">
            <h2 className="text-center mb-4">Войдите или зарегистрируйтесь</h2>
            <form 
                onSubmit={handleSubmit} 
                className="p-4 border rounded shadow-sm" 
                style={{ maxWidth: '400px', margin: '0 auto' }} // Ограничиваем ширину формы
            >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="text-danger mb-3">{error}</div>}
                
                <button 
                    type="submit" 
                    className="btn btn-primary w-100 mb-3" 
                >
                    Войти
                </button>

                <button 
                    type="button"
                    className="btn btn-secondary w-100"
                    onClick={() => navigate('/registration')}
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
};

export default AuthFormUI;
