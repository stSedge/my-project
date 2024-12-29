import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {authenticateUser} from './CreateAccFormThunks'

const CreateAccForm: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
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
            await authenticateUser(userData);
            navigate("/login");
        } catch (err) {
            setError("Произошла ошибка при создании пользователя");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Регистрация</h2>
            <form 
                onSubmit={handleSubmit} 
                className="p-4 border rounded shadow-sm" 
                style={{ maxWidth: '400px', margin: '0 auto' }} 
            >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Имя:</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Возраст:</label>
                    <input
                        type="number"
                        id="age"
                        className="form-control"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Пол:</label>
                    <select
                        id="gender"
                        className="form-select"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="male">Мужской</option>
                        <option value="female">Женский</option>
                    </select>
                </div>
                {error && <div className="text-danger mb-3">{error}</div>}
                <button 
                    type="submit" 
                    className="btn btn-primary w-100" 
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Минуточку..." : "Зарегистрироваться"}
                </button>
            </form>
        </div>
    );
};

export default CreateAccForm;
