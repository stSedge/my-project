// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation.tsx';  // Импортируем компонент навигации

// Импортируем страницы
import AuthForm from './components/AuthForm.tsx';
import Flowers from './components/Flowers.tsx';
import Bouquets from './components/Bouquets.tsx';
import FlowerForm from './components/FlowerForm.tsx';
import ReportForm from './components/Report.tsx';
import AdditionalProducts from './components/AdditionalProducts.tsx';
import ProductForm from './components/ProductForm.tsx';
import CreateAccForm from './components/CreateAccForm.tsx';
import { useSelector } from 'react-redux';
import { userAuthSelector } from './reducer/UserStore/reducer.ts';
import { userJwtSelector } from './reducer/UserStore/reducer.ts';
import LogoutPage from './components/LogoutPage.tsx';
import HomePage from './components/HomePage.tsx';

const App: React.FC = () => {

  return (
    <Router> {}
      <div>
        <Navigation /> {}
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/registration" element={<CreateAccForm />} />
          <Route path="/flowers" element={<Flowers />} />
          <Route path="/bouquets" element={<Bouquets />} />
          <Route path="/add_flowers" element={<FlowerForm />} />
          <Route path="/add_products" element={<ProductForm />} />
          <Route path="/get_report" element={<ReportForm />} />
          <Route path="/get_additional_products" element={<AdditionalProducts />} />
          <Route path="/*" element={<div> Страница не найдена </div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
