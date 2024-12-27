import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CartProvider } from './components/context/CartContext'; 
import Navigation from './components/Navigation';

import Flowers from './components/Flowers';
import Bouquets from './components/Bouquets';
import ReportForm from './components/Report';
import AdditionalProducts from './components/AdditionalProducts';
import CreateAccForm from './components/CreateAccForm';
import HomePage from './components/HomePage';
import AuthFormUI from './components/AuthForm/AuthForm';
import AdminPage from './components/AdminPage';
import ReportForm2 from './components/Report2';
import { userAdminSelector } from './reducer/UserStore/reducer';
import { useSelector } from 'react-redux';
import CartPage from './components/CartPage';
import UserPurchaseHistory from './components/PurchaseHistory';
//import AuthForm from './components/AuthForm'

const App: React.FC = () => {
  const isAdmin = useSelector(userAdminSelector);

  return (
    <Router>
      <CartProvider> 
        <div>
          <Navigation />
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AuthFormUI />} />
            <Route path="/history" element={<UserPurchaseHistory />} />
            <Route path="/registration" element={<CreateAccForm />} />
            <Route path="/flowers" element={<Flowers />} />
            <Route path="/bouquets" element={<Bouquets />} />
            <Route path="/get_additional_products" element={<AdditionalProducts />} />
            <Route path="/get_report" element={isAdmin ? <ReportForm /> : <Navigate to="/login" />} />
            <Route path="/get_report_sup" element={isAdmin ? <ReportForm2 /> : <Navigate to="/login" />} />
            <Route path="/admin" element={isAdmin ? <AdminPage /> : <Navigate to="/login" />} />
            <Route path="/cart" element={<CartPage />} /> 
            <Route path="*" element={<div> Страница не найдена </div>} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;
