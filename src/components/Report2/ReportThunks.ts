import axios from "../../axiosConfig";


export const get_report = async (startDate : string, endDate : string, jwt : string | null) => {
    try {
        const response = await axios.get(`/api/otchet2/'${startDate}'/'${endDate}'`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
          });
        return response;
    } catch (error) {
      throw error;
    }
};