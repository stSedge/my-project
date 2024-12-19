import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig.ts'; 

import { useSelector } from 'react-redux';
import { userAuthSelector } from '../reducer/UserStore/reducer.ts';
import { userJwtSelector } from '../reducer/UserStore/reducer.ts';

const Bouquets: React.FC = () => {
    const jwt = useSelector(userJwtSelector);
    const [bouquets, setBouquets] = useState<any[]>([]); 
    const [error, setError] = useState<string>('');
    const [flowersForBouquet, setFlowersForBouquet] = useState<{ [key: number]: string }>({});

    const fetchFlowersForBouquet = async (bouquetId: number) => {
       
        try {
            const response = await axios.get(`api/compound_bouquet_flowers/${bouquetId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            setFlowersForBouquet((prev) => ({
                ...prev,
                [bouquetId]: response.data.id_flower.toString(),
            }));
        } catch (err) {
            console.error(`Ошибка при получении состава цветов для букета ${bouquetId}`, err);
        }
    };

    useEffect(() => {
        const fetchBouquets = async () => {
            try {
                const response = await axios.get('api/all_bouquets', {
                    headers: {
                        Authorization: `Bearer ${jwt}`, 
                    },
                });
                setBouquets(response.data); 
                response.data.forEach((bouquet: any) => {
                    fetchFlowersForBouquet(bouquet.id);
                });
            } catch (err) {
                setError('Не удалось загрузить данные.');
                console.error(err);
            }
        };

        fetchBouquets();
    }, []);

    return (
        <div>
            <h1>Все Букеты</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Название</th>
                        <th>Состав</th>
                    </tr>
                </thead>
                <tbody>
                    {bouquets.length === 0 ? (
                        <tr><td colSpan={3}>Нет данных</td></tr>
                    ) : (
                        bouquets.map((bouquet: any) => (
                            <tr key={bouquet.id}>
                                <td>{bouquet.id}</td>
                                <td>{bouquet.name}</td>
                                <td>
                                    {flowersForBouquet[bouquet.id] ? flowersForBouquet[bouquet.id] : 'Загружается...'}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Bouquets;
