import axios from '../../axiosConfig';

export const fetchFlowerPrice = async (id: number) => {
    try {
        const response = await axios.get(`api/cost/1/${id}`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении цены', error);
        return null;
    }
};

export const allFlowers = async () => {
    try {
        const response = await axios.get('api/all_flowers');
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении цены', error);
        return [];
    }
};