import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAdminSelector, userAgeSelector, userAuthSelector, userDiscountSelector, 
  userEmailSelector, userGenderSelector, userNameSelector, userTotalSumSelector } 
  from "../../reducer/UserStore/reducer"; 
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { setIsAdmin, setIsAuth, setJwt } from '../../reducer/UserStore';
import { useCart } from '../CartPage/Cart';

const HomePage: React.FC = () => {
  const isAuth = useSelector(userAuthSelector);
  const isAdmin = useSelector(userAdminSelector);
  const name = useSelector(userNameSelector);
  const age = useSelector(userAgeSelector);
  const discount = useSelector(userDiscountSelector);
  const email = useSelector(userEmailSelector);
  const totalSum = useSelector(userTotalSumSelector);
  const gender = useSelector(userGenderSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, removeFromCart, clearCart } = useCart();

  const handleLogout = () => {
    dispatch(setJwt(''));
    dispatch(setIsAuth(false));
    dispatch(setIsAdmin(false));
    navigate("/login");
    clearCart();
  };

  const handlePurchaseHistory = () => {
    navigate("/history");
  };

  const userDetails = [
    { label: "Сумма покупок", value: `${totalSum}₽` },
    { label: "Скидка", value: `${discount}%` },
    { label: "Возраст", value: `${age} лет` },
    { label: "Пол", value: gender === 'male' ? 'Мужской' : 'Женский' },
    { label: "Email", value: email }
  ];

  return (
    <div className="container mt-5">
      {isAuth ? (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="text-center">Добро пожаловать, {name}!</Card.Title>

                {!isAdmin && userDetails.map(({ label, value }) => (
                  <Card.Text key={label}>
                    <strong>{label}: </strong>{value}
                  </Card.Text>
                ))}

                {isAdmin && (
                  <Card.Text>
                    <strong>Вы вошли в систему как администратор</strong>
                  </Card.Text>
                )}

                <div className="text-center">
                  <Button variant="outline-secondary" onClick={handleLogout}>Выйти из аккаунта</Button>
                  {!isAdmin && (
                    <Button 
                      variant="primary" 
                      className="ms-3" 
                      onClick={handlePurchaseHistory}
                    >
                      История покупок
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center">
        </div>
      )}
    </div>
  );
};

export default HomePage;
