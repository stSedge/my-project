import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CartProvider } from './components/CartPage/Cart'; 
import Navigation from './Navigation/Navigation';

import Flowers from './components/Flowers/Flowers';
import Bouquets from './components/Bouquets/Bouquets';
import ReportForm from './components/Report/Report';
import AdditionalProducts from './components/AdditionalProducts/AdditionalProducts';
import CreateAccForm from './components/CreateAccForm/CreateAccForm';
import HomePage from './components/HomePage/HomePage';
import AuthFormUI from './components/AuthForm/AuthForm';
import AdminPage from './components/AdminPage/AdminPage';
import ReportForm2 from './components/Report2/Report2';
import { userAdminSelector, userAuthSelector } from './reducer/UserStore/reducer';
import { useSelector } from 'react-redux';
import CartPage from './components/CartPage/CartPage';
import UserPurchaseHistory from './components/History/PurchaseHistory';
//import AuthForm from './components/AuthForm'

const App: React.FC = () => {
  const isAdmin = useSelector(userAdminSelector);
  const isAuth = useSelector(userAuthSelector);

  return (
    <Router>
      <CartProvider> 
        <div>
          <Navigation />
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AuthFormUI />} />
            <Route path="/history" element={isAuth ? <UserPurchaseHistory /> : <Navigate to="/login" />} />
            <Route path="/registration" element={<CreateAccForm />} />
            <Route path="/flowers" element={<Flowers />} />
            <Route path="/bouquets" element={<Bouquets />} />
            <Route path="/additional_products" element={<AdditionalProducts />} />
            <Route path="/get_report" element={isAdmin ? <ReportForm /> : <Navigate to="/login" />} />
            <Route path="/get_report_sup" element={isAdmin ? <ReportForm2 /> : <Navigate to="/login" />} />
            <Route path="/admin" element={isAdmin ? <AdminPage /> : <Navigate to="/login" />} />
            <Route path="/cart" element={isAuth ? <CartPage /> : <Navigate to="/login" />} /> 
            <Route path="*" element={<div> Страница не найдена </div>} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;
