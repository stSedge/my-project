import React from 'react';
import { useCart } from './Cart';
import { Button, Container, ListGroup, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userDiscountSelector, userIdSelector, userTotalSumSelector } from '../../reducer/UserStore/reducer';
import { setTotalSum } from '../../reducer/UserStore';
import { get_id, addSelling } from './CartPageThunk';

const CartPage: React.FC = () => {
    const { cart, clearCart } = useCart();
    const discount = useSelector(userDiscountSelector);
    const user_id = useSelector(userIdSelector);
    const totalSum = useSelector(userTotalSumSelector);
    const dispatch = useDispatch();

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.flower.price * item.quantity, 0);
    };


    const handlePlaceOrder = () => {
        if (cart.length === 0) {
            console.log("Корзина пуста. Добавьте товары в корзину.");
        } else {
            console.log("Ваш заказ:");
            cart.forEach(async (item) => {
                const id_sup = get_id(item.flower.id);
                addSelling(item.quantity, item.flower.price, await id_sup, user_id, discount);
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
