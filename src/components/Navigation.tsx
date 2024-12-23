import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/home">Главная</Link>
                </li>
                <li>
                    <Link to="/login">Авторизация</Link>
                </li>
                <li>
                    <Link to="/logout">Выход из аккаунта</Link>
                </li>
                <li>
                    <Link to="/flowers">Список цветов</Link>
                </li>
                <li>
                    <Link to="/bouquets">Список букетов</Link>
                </li>
                <li>
                    <Link to="/add_flowers">Добавить цветы</Link>
                </li>
                <li>
                    <Link to="/delete_flowers">Удалить цветы</Link>
                </li>
                <li>
                    <Link to="/update_flowers">Обновить данные о цветах</Link>
                </li>
                <li>
                    <Link to="/add_products">Добавить товары</Link>
                </li>
                <li>
                    <Link to="/get_report">Отчет по продажам за период</Link>
                </li>
                <li>
                    <Link to="/get_additional_products">Разные товары</Link>
                </li>
                <li>
                    <Link to="/registration">Регистрация</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
