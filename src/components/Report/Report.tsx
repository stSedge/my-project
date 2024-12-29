import { useState } from 'react';
import { userJwtSelector } from '../../reducer/UserStore/reducer';
import { useSelector } from 'react-redux';
import { get_report } from './ReportThunks';

interface report_data {
  seller_name : string,
  cost : number,
  discount: number,
  final_cost : number,
  count : number,
  summa : number,
  product_type : string,
  product_name : string | null,
  date : string,
  user_id : number,
  product_id : number,
}

const ReportForm = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState<report_data[]>([]);
  const [filteredData, setFilteredData] = useState<report_data[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const [filterProductType, setFilterProductType] = useState<string>(''); 
  const [filterProductName, setFilterProductName] = useState<string>(''); 
  const [filterDate, setFilterDate] = useState<string>('');
  const jwt = useSelector(userJwtSelector);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setReportData([]);
    setError(null);
    setLoading(true);
    try {
      const response = await get_report(startDate, endDate, jwt);
      setReportData(response.data);
      setFilteredData(response.data); 
    } catch (err) {
      setError('Ошибка при получении отчета');
    } finally {
      setLoading(false);
    }
  };

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
      <h1 className="text-center mb-4">Отчет по продажам</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="start_date" className="form-label">Начало периода</label>
              <input
                type="date"
                id="start_date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="end_date" className="form-label">Конец периода</label>
              <input
                type="date"
                id="end_date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Загрузка...' : 'Получить отчет за период'}
          </button>
        </div>
      </form>

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

      {filteredData.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Продавец</th>
                <th>Стоимость</th>
                <th>Количество</th>
                <th>Скидка</th>
                <th>Итоговая стоимость</th>
                <th>Тип товара</th>
                <th>Название товара</th>
                <th>ID товара</th>
                <th>Дата</th>
                <th>ID пользователя</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((report, index) => (
                <tr key={index}>
                  <td>{report.seller_name}</td>
                  <td>{report.cost}</td>
                  <td>{report.count}</td>
                  <td>{report.discount}</td>
                  <td>{report.final_cost}</td>
                  <td>{report.product_type === 'bouquet' ? 'Букет' : (report.product_type === 'flower' ? 'Цветок' : 'Товар для дома')}</td>
                  <td>{report.product_name}</td>
                  <td>{report.product_id}</td>
                  <td>{report.date}</td>
                  <td>{report.user_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportForm;
