import axios from '../../axiosConfig';

export const authenticateUser = async (email: string, password: string) => {
  try {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    const response = await axios.post('/token', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return response.data.access_token;
  } catch (error) {
    throw error;
  }
};

export const getUserData = async (email: string) => {
  try {
    const response = await axios.get(`/api/user_email/${email}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
