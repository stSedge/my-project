import React from 'react';
import { useCart } from './context/CartContext';
import { Button, Container, ListGroup, Row, Col } from 'react-bootstrap';
import axios from '../axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { userDiscountSelector, userIdSelector, userTotalSumSelector } from '../reducer/UserStore/reducer';
import { setTotalSum } from '../reducer/UserStore';

const CartPage: React.FC = () => {
    const { cart, clearCart } = useCart();
    const discount = useSelector(userDiscountSelector);
    const user_id = useSelector(userIdSelector);
    const totalSum = useSelector(userTotalSumSelector);
    const dispatch = useDispatch();

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.flower.price * item.quantity, 0);
    };

    const addSelling = async (cnt: number, c: number, id_sup : number) => {
        const flowerData = {
            id_seller: 2,
            id_supply: id_sup,
            id_user: user_id,
            count: cnt,
            discount: discount,
            cost: c, 
            final_cost: cnt * c * (1. - (discount ? discount : 0) / 100.),
            data: '2024-12-26'
        };
      try {
        const response = await axios.post("/api/create_selling", flowerData);
        return response.data;
      } catch (error) {
        throw error;
      }
    };

    const get_id = async (id : number) => {
      try {
        const response = await axios.get(`/api/supply_id/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    };

    const handlePlaceOrder = () => {
        if (cart.length === 0) {
            console.log("Корзина пуста. Добавьте товары в корзину.");
        } else {
            console.log("Ваш заказ:");
            cart.forEach(async (item) => {
                const id_sup = get_id(item.flower.id);
                addSelling(item.quantity, item.flower.price, await id_sup);
                dispatch(setTotalSum((totalSum ? totalSum : 0) + item.quantity * item.flower.price));
                //console.log(`Товар: ${item.flower.name}, Цена: ${item.flower.price} руб., Количество: ${item.quantity}`);
            });
            
            clearCart();
        }
    };

    return (
        <Container className="mt-5">
            <h1>Корзина</h1>
            {cart.length === 0 ? (
                <p>Ваша корзина пуста.</p>
            ) : (
                <>
                    <ListGroup>
                        {cart.map((item, index) => (
                            <ListGroup.Item key={index}>
                                {item.flower.name} - {item.flower.price} руб. x {item.quantity} шт.
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    <Row className="mt-4">
                        <Col className="text-end">
                            <h4>Общая сумма: {getTotalPrice()} руб.</h4>
                        </Col>
                    </Row>
                </>
            )}
            <Button 
                variant="primary" 
                onClick={handlePlaceOrder}
                disabled={cart.length === 0} 
                className="mt-3"
            >
                Оформить заказ
            </Button>
            <Button 
                variant="danger" 
                onClick={clearCart}
                className="ms-2 mt-3"
            >
                Очистить корзину
            </Button>
        </Container>
    );
};

export default CartPage;
