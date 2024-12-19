import React, { useState } from 'react';
import axios from '../axiosConfig.ts';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setJwt } from '../reducer/UserStore/index.ts';
import { setIsAuth } from '../reducer/UserStore/index.ts';


const CreateAccForm: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("male");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const userData = {
            name,
            email,
            password,
            age,
            gender,
            total_sum: 0, 
            discount: 0,
            is_admin: false,
        };

        try {
            const response = await axios.post("/api/create_user", userData);
            navigate("/home");
        } catch (err) {
            setError("Произошла ошибка при создании пользователя");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2>Создание пользователя</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Имя:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                    <label htmlFor="login">Логин:</label>
                    <input
                        type="text"
                        id="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
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
                <div>
                    <label htmlFor="age">Возраст:</label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="gender">Пол:</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="male">Мужской</option>
                        <option value="female">Женский</option>
                    </select>
                </div>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Создаю..." : "Создать пользователя"}
                </button>
            </form>
        </div>
    );
};

export default CreateAccForm;
