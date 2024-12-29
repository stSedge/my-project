import axios from '../../axiosConfig';

interface UserData {
    name : string,
    email : string,
    password : string,
    age : number,
    gender : string,
    total_sum: number, 
    discount: number,
    is_admin: boolean,
};

export const authenticateUser = async (userData : UserData) => {
  try {
    const response = await axios.post("/api/create_user", userData);
    return;
  } catch (error) {
    throw error;
  }
};