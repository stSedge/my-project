import axios from "../../axiosConfig";

export const fetchBouquetPrice = async (bouquetId: number, jwt : string | null) => {
    try {
        const response = await axios.get(`api/cost/2/${bouquetId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        return response.data; 
    } catch (err) {
        console.error(`Ошибка при получении цены для букета ${bouquetId}`, err);
        return null;
    }
};

export const flowersForBouquets = async (bouquetId: number, jwt : string | null) => {
    try {
        const response = await axios.get(`api/compound_bouquet_flowers/${bouquetId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        return response.data; 
    } catch (err) {
        console.error(`Ошибка при получении цветов для букета ${bouquetId}`, err);
        return null;
    }
};

export const allBouquets = async (jwt : string | null) => {
    try {
        const response = await axios.get('api/all_bouquets', {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        return response.data; 
    } catch (err) {
        console.error(err);
        return null;
    }
};