import axios from '../../axiosConfig';

export const get_id = async (id : number) => {
    try {
      const response = await axios.get(`/api/supply_id/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
};


export const addSelling = async (cnt: number, c: number, id_sup : number, user_id : number | null, discount : number | null) => {
    const flowerData = {
        id_seller: 2,
        id_supply: id_sup,
        id_user: user_id,
        count: cnt,
        discount: discount,
        cost: c, 
        final_cost: cnt * c * (1. - (discount ? discount : 0) / 100.),
        data: '2024-12-30'
    };
  try {
    const response = await axios.post("/api/create_selling", flowerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
