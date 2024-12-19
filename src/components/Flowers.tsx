import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig.ts';

const Flowers: React.FC = () => {
    const [flowers, setFlowers] = useState<any[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchFlowers = async () => {
            try {
                const response = await axios.get('api/all_flowers');
                setFlowers(response.data);
            } catch (err) {
                setError('Не удалось загрузить данные.');
                console.error(err);
            }
        };

        fetchFlowers();
    }, []);

    return (
        <div>
            <h1>Все Цветы</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Название</th>
                    </tr>
                </thead>
                <tbody>
                    {flowers.length === 0 ? (
                        <tr><td colSpan={3}>Нет данных</td></tr>
                    ) : (
                        flowers.map((flower: any) => (
                            <tr key={flower.id}>
                                <td>{flower.id}</td>
                                <td>{flower.name}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Flowers;
