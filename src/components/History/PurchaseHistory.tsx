import React, { useState, useEffect } from 'react';
import axios from "../../axiosConfig";
import { userIdSelector, userJwtSelector } from '../../reducer/UserStore/reducer';
import { useSelector } from 'react-redux';

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

const PurchaseHistory = () => {
  const [reportData, setReportData] = useState<report_data[]>([]);
  const [filteredData, setFilteredData] = useState<report_data[]>([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const [filterProductType, setFilterProductType] = useState<string>(''); 
  const [filterProductName, setFilterProductName] = useState<string>(''); 
  const [filterDate, setFilterDate] = useState<string>('');
  const jwt = useSelector(userJwtSelector);
  const id = useSelector(userIdSelector);

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      setError(null);
      try {
        const startDate = `'2024-01-01'`; 
        const endDate = `'2024-12-31'`;
        const response = await axios.get(`/api/otchet/${startDate}/${endDate}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        let data = response.data;
        data = data.filter((item: report_data) => item.product_name !== null && item.user_id === id);
        setReportData(data);
        setFilteredData(data); 
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [jwt]); 

  const handleFilter = () => {
    let filtered = reportData;
    if (filterProductType !== '') {
      filtered = filtered.filter((item) => item.product_type.toLowerCase().includes(filterProductType.toLowerCase()));
    }
    if (filterProductName !== '') {
      filtered = filtered.filter((item) => item.product_name?.toLowerCase().includes(filterProductName.toLowerCase()));
    }

    if (filterDate !== '') {
      filtered = filtered.filter((item) => item.date === filterDate);
    }

    setFilteredData(filtered);
  };

  const handleResetFilters = () => {
    setFilterProductType('');
    setFilterProductName('');
    setFilterDate('');
    setFilteredData(reportData); 
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Мои покупки</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-4">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="filter_product_type" className="form-label">Тип товара:</label>
              <select
                id="filter_product_type"
                className="form-control"
                value={filterProductType}
                onChange={(e) => setFilterProductType(e.target.value)}
              >
                <option value="">Все типы</option>
                <option value="flower">Цветок</option>
                <option value="bouquet">Букет</option>
                <option value="additional_product">Товары для дома</option>
              </select>
            </div>
          </div>

          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="filter_product_name" className="form-label">Название товара:</label>
              <input
                type="text"
                id="filter_product_name"
                className="form-control"
                value={filterProductName}
                onChange={(e) => setFilterProductName(e.target.value)}
                placeholder="Введите название товара"
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="filter_date" className="form-label">Дата:</label>
              <input
                type="date"
                id="filter_date"
                className="form-control"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleFilter}
          >
            Применить фильтры
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={handleResetFilters}
          >
            Сбросить фильтры
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center">Загрузка...</div>
      ) : (
        filteredData.length > 0 && (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Тип товара</th>
                  <th>Название товара</th>
                  <th>Стоимость</th>
                  <th>Количество</th>
                  <th>Скидка</th>
                  <th>Итоговая стоимость</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((report, index) => (
                  <tr key={index}>
                    <td>{report.date}</td>
                    <td>{report.product_type === 'bouquet' ? 'Букет' : (report.product_type === 'flower' ? 'Цветок' : 'Товар для дома')}</td>
                    <td>{report.product_name}</td>
                    <td>{report.cost}</td>
                    <td>{report.count}</td>
                    <td>{report.discount}</td>
                    <td>{report.final_cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default PurchaseHistory;