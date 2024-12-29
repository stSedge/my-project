import { useState } from 'react';
import axios from '../../axiosConfig';

interface report_data {
  seller_name: string;
  cost: number;
  discount: number;
  final_cost: number;
  count: number;
  summa: number;
  product_type: string;
  product_name: string | null;
  date: string;
  user_id: number;
  product_id: number;
}

const useFetchReportData = (jwt: string | null, id: number | null) => {
  const [reportData, setReportData] = useState<report_data[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReportData = async () => {
    setLoading(true);
    setError(null);
    try {
      const startDate = '2024-01-01';
      const endDate = '2024-12-31';
      const response = await axios.get(`/api/otchet/${startDate}/${endDate}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      let data = response.data;
      data = data.filter(
        (item: report_data) => item.product_name !== null && item.user_id === id
      );
      setReportData(data);
    } catch (err) {
      setError('Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  return { reportData, loading, error, fetchReportData };
};

export default useFetchReportData;
