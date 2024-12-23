import React, { useState } from 'react';
import axios from "../axiosConfig";
import { userJwtSelector } from '../reducer/UserStore/reducer';
import { useSelector } from 'react-redux';

interface report_data {
  seller_name : string,
  cost : number,
  discount: number,
  final_cost : number,
  count : number,
  summa : number,
  product_type : string,
  date : string,
  user_id : number,
  product_id : number,
}

const ReportForm = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState<report_data[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const jwt = useSelector(userJwtSelector);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setReportData([]);
    setError(null);
    setLoading(true);
    try {
      const response = await axios.get(`/api/otchet/'${startDate}'/'${endDate}'`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });
      setReportData(response.data); 
    } catch (err) {
      setError('Ошибка при получении отчета');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Генерация отчета</h1>
      
      {}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="start_date">Дата начала:</label>
          <input
            type="date"
            id="start_date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="end_date">Дата окончания:</label>
          <input
            type="date"
            id="end_date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Загрузка...' : 'Получить отчет'}
        </button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {reportData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Продавец</th>
              <th>Стоимость</th>
              <th>Скидка</th>
              <th>Итоговая стоимость</th>
              <th>Количество</th>
              <th>Сумма</th>
              <th>Тип товара</th>
              <th>ID товара</th>
              <th>Дата</th>
              <th>ID пользователя</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((report, index) => (
              <tr key={index}>
                <td>{report.seller_name}</td>
                <td>{report.cost}</td>
                <td>{report.discount}</td>
                <td>{report.final_cost}</td>
                <td>{report.count}</td>
                <td>{report.summa}</td>
                <td>{report.product_type}</td>
                <td>{report.product_id}</td>
                <td>{report.date}</td>
                <td>{report.user_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportForm;
