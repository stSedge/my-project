import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useSelector } from 'react-redux';
import { userJwtSelector } from '../reducer/UserStore/reducer';

const AdditionalProducts: React.FC = () => {
    const jwt = useSelector(userJwtSelector);
    const [products, setproducts] = useState<any[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchproducts = async () => {
            try {
                const response = await axios.get('api/all_additional_products');
                setproducts(response.data); 
            } catch (err) {
                setError('Не удалось загрузить данные.');
                console.error(err);
            }
        };

        fetchproducts();
    }, []); 

    return (
        <div>
            <h1>Разные товары</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Название</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 ? (
                        <tr><td colSpan={3}>Нет данных</td></tr>
                    ) : (
                        products.map((product: any) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdditionalProducts;
