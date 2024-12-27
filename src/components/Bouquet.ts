
import axios from '../axiosConfig';


export const addBouquet = async (flowername: string , jwt: string) => {
    const flowerData = {
        name: flowername,
    };
  try {
    const response = await axios.post("/api/create_bouquet", flowerData, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const delBouquet = async (flowername: number | string, jwt: string) => {
    try {
      await axios.delete(`/api/delete_bouquet/${flowername}`, {
        headers: {
            Authorization: `Bearer ${jwt}`, 
        },
      });
    } catch (error) {
      throw error;
    }
};

export const updBouquet = async (flowername: string, bouquet_id : string | number, jwt: string) => {
    const flowerData = {
        name: flowername,
    };
    try {
      const response = await axios.put(`/api/update_bouquet/${bouquet_id}`, flowerData, {
          headers: {
              Authorization: `Bearer ${jwt}`,
          },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  