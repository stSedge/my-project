
import axios from '../../axiosConfig';


export const addProduct = async (flowername: string, jwt: string) => {
    const flowerData = {
        name: flowername,
    };
  try {
    const response = await axios.post("/api/create_additional_product", flowerData, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const delProduct = async (flowername: number | string, jwt: string) => {
    try {
      await axios.delete(`/api/delete_additional_product/${flowername}`, {
        headers: {
            Authorization: `Bearer ${jwt}`, 
        },
      });
    } catch (error) {
      throw error;
    }
};
  
export const updProduct = async (flowername: string, additional_product_id : string | number, jwt: string) => {
    const flowerData = {
        name: flowername,
    };
    try {
      const response = await axios.put(`/api/update_additional_product/${additional_product_id}`, flowerData, {
          headers: {
              Authorization: `Bearer ${jwt}`,
          },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };