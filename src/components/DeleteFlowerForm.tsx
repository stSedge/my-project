import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userJwtSelector } from '../reducer/UserStore/reducer';

const DeleteFlowerForm: React.FC = () => {
    const [flowerId, setFlowerId] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = useSelector(userJwtSelector);

    const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        
        try {
            await axios.delete(`/api/delete_flower/${flowerId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`, 
                },
            });
            navigate('/flowers');
        } catch (error) {
            setError('Произошла ошибка при удалении цветка');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2>Удалить цветок</h2>
            <form onSubmit={handleDelete}>
                <div>
                    <label htmlFor="flowerId">ID Цветка:</label>
                    <input
                        type="text"
                        id="flowerId"
                        value={flowerId}
                        onChange={(e) => setFlowerId(e.target.value)}
                        required
                    />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Удаляется...' : 'Удалить цветок'}
                </button>
            </form>
        </div>
    );
};

export default DeleteFlowerForm;
