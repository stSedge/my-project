import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';


import Flowers from './components/Flowers';
import Bouquets from './components/Bouquets';
import FlowerForm from './components/FlowerForm';
import ReportForm from './components/Report';
import AdditionalProducts from './components/AdditionalProducts';
import ProductForm from './components/ProductForm';
import CreateAccForm from './components/CreateAccForm';
import LogoutPage from './components/LogoutPage';
import HomePage from './components/HomePage';
import DeleteFlowerForm from './components/DeleteFlowerForm';
import AuthFormUI from './components/AuthForm/AuthForm';
//import AuthForm from './components/AuthForm'

const App: React.FC = () => {

  return (
    <Router> {}
      <div>
        <Navigation /> {}
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthFormUI />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/registration" element={<CreateAccForm />} />
          <Route path="/flowers" element={<Flowers />} />
          <Route path="/bouquets" element={<Bouquets />} />
          <Route path="/add_flowers" element={<FlowerForm />} />
          <Route path="/delete_flowers" element={<DeleteFlowerForm />} />
          <Route path="/add_products" element={<ProductForm />} />
          <Route path="/get_report" element={<ReportForm />} />
          <Route path="/get_additional_products" element={<AdditionalProducts />} />
          <Route path="*" element={<div> Страница не найдена </div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
