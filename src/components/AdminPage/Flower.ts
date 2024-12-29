
import axios from '../../axiosConfig';


export const addFlower = async (flowername: string, jwt: string) => {
    const flowerData = {
        name: flowername,
    };
  try {
    const response = await axios.post("/api/create_flower", flowerData, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updFlower = async (flowername: string, flower_id : string | number, jwt: string) => {
  const flowerData = {
      name: flowername,
  };
  try {
    const response = await axios.put(`/api/update_flower/${flower_id}`, flowerData, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const delFlower = async (flowername: number | string, jwt: string) => {
  try {
    await axios.delete(`/api/delete_flower/${flowername}`, {
      headers: {
          Authorization: `Bearer ${jwt}`, 
      },
    });
  } catch (error) {
    throw error;
  }
};
