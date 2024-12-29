import axios from '../../axiosConfig';

interface product_data {
    name: string, 
    id: number,
    id_type: number,
    price: number
}

export const fetchProductPrice = async (id: number) => {
    try {
        const response = await axios.get(`api/cost/3/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching price', error);
        return null;
    }
};

export const getAllProducts = async () => {
    try {
        const response = await axios.get('api/all_additional_products');
        const productsData = response.data;

        const productsWithPrice = await Promise.all(
            productsData.map(async (product: product_data) => {
                const price = await fetchProductPrice(product.id);
                return { ...product, price };
            })
        );
        return productsWithPrice;

    } catch (error) {
        console.error('Error fetching price', error);
        return [];
    }
};