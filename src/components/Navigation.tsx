import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userAdminSelector, userAuthSelector } from '../reducer/UserStore/reducer';

const Navigation: React.FC = () => {
  const isAdmin = useSelector(userAdminSelector);
  const isAuth = useSelector(userAuthSelector);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/home">Цветочный магазин БУЛЬБАЗАВР</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isAuth ?
            (<li className="nav-item">
              <Link to="/home" className="nav-link">Мой аккаунт</Link>
            </li>) : (null)}
            <li className="nav-item">
              <Link to="/flowers" className="nav-link">Цветы</Link>
            </li>
            <li className="nav-item">
              <Link to="/bouquets" className="nav-link">Букеты</Link>
            </li>
            <li className="nav-item">
              <Link to="/get_additional_products" className="nav-link">Товары для дома</Link>
            </li>
            {isAdmin ?
            (<li className="nav-item">
              <Link to="/admin" className="nav-link">Страница администратора</Link>
            </li>) : (null)}
            {isAuth ? (null) :
            (<li className="nav-item">
              <Link to="/login" className="nav-link btn btn-outline-success ms-2">Войти</Link>
            </li>)}
            {(!isAuth || isAdmin) ? (null) :
            (<li className="nav-item">
              <Link to="/cart" className="nav-link">Моя корзина</Link>
            </li>)}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
