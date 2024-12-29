import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Alert, Spinner, Button, Form, Toast, ToastContainer } from 'react-bootstrap';
import { useCart } from '../CartPage/Cart';
import { userAdminSelector } from '../../reducer/UserStore/reducer';
import { useSelector } from 'react-redux';
import {allFlowers, fetchFlowerPrice} from './FlowersThunks';

interface product_data {
    name: string, 
    id: number,
    id_type: number,
    price: number
}

const Flowers: React.FC = () => {
    const isAdmin = useSelector(userAdminSelector);
    const [flowers, setFlowers] = useState<product_data[]>([]);
    const [filteredFlowers, setFilteredFlowers] = useState<product_data[]>([]);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const { addToCart } = useCart();
    const [searchQuery, setSearchQuery] = useState<string>(''); 
    const [priceRange, setPriceRange] = useState<{ min: number, max: number }>({ min: 0, max: 10000 }); 
    const [tempSearchQuery, setTempSearchQuery] = useState<string>(''); 
    const [tempPriceRange, setTempPriceRange] = useState<{ min: number, max: number }>({ min: 0, max: 10000 });
    const [showToast, setShowToast] = useState<boolean>(false); 


    useEffect(() => {
        const fetchFlowers = async () => {
            try {
                const flowersData = await allFlowers();

                const flowersWithPrice = await Promise.all(
                    flowersData.map(async (flower: product_data) => {
                        const price = await fetchFlowerPrice(flower.id);
                        return { ...flower, price }; 
                    })
                );
                const filteredFlowers = isAdmin ? flowersWithPrice : flowersWithPrice.filter(flower => flower.price !== null);
                setFlowers(filteredFlowers);
                setFilteredFlowers(filteredFlowers);
                setLoading(false);
            } catch (err) {
                setError('Не удалось загрузить данные.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchFlowers();
    }, [isAdmin]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempSearchQuery(e.target.value);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
        const value = parseInt(e.target.value);
        const newPriceRange = { ...tempPriceRange, [type]: value };
        setTempPriceRange(newPriceRange);
    };

    const applyFilters = () => {
        const filtered = flowers.filter(flower => {
            const matchesName = flower.name.toLowerCase().includes(tempSearchQuery.toLowerCase());
            const matchesPrice = flower.price >= tempPriceRange.min && flower.price <= tempPriceRange.max;
            return matchesName && matchesPrice;
        });
        setFilteredFlowers(filtered);
    };

    const resetFilters = () => {
        setTempSearchQuery('');
        setTempPriceRange({ min: 0, max: 10000 });
        setFilteredFlowers(flowers);
    };

    const handleAddToCart = (flower: product_data) => {
        addToCart(flower);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); 
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Ассортимент цветов</h1>

            <Form className="mb-4">
                {/* Поле для поиска */}
                <Form.Group controlId="searchQuery" className="mb-3">
                    <Form.Label>Поиск по названию</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={tempSearchQuery} 
                        onChange={handleSearchChange} 
                        placeholder="Введите название цветка" 
                        style={{ width: '300px' }}
                    />
                </Form.Group>

                <Form.Group controlId="priceRange" className="mt-3 mb-4">
                    <Form.Label>Диапазон цен</Form.Label>
                    <div>
                        <Form.Control 
                            type="number" 
                            value={tempPriceRange.min} 
                            onChange={(e : React.ChangeEvent<HTMLInputElement>) => handlePriceChange(e, 'min')} 
                            placeholder="Мин. цена"
                            className="d-inline w-auto me-2"
                        />
                        - 
                        <Form.Control 
                            type="number" 
                            value={tempPriceRange.max} 
                            onChange={(e : React.ChangeEvent<HTMLInputElement>) => handlePriceChange(e, 'max')} 
                            placeholder="Макс. цена"
                            className="d-inline w-auto ms-2"
                        />
                    </div>
                </Form.Group>

                <div className="d-flex justify-content-start gap-2">
                    <Button variant="primary" onClick={applyFilters} className="me-2">
                        Применить фильтры
                    </Button>
                    <Button variant="secondary" onClick={resetFilters}>
                        Сбросить фильтры
                    </Button>
                </div>
            </Form>

            {loading && (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p>Загрузка...</p>
                </div>
            )}

            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && !error && filteredFlowers.length === 0 && (
                <Alert variant="warning" className="text-center">
                    Нет данных о цветах.
                </Alert>
            )}

            {!loading && !error && filteredFlowers.length > 0 && (
                <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
                    {filteredFlowers.map((flower: product_data) => (
                        <Col key={flower.id}>
                            <Card className="h-100">
                                <Card.Img 
                                    variant="top" 
                                    src={'/bulbasavr.gif'} 
                                    alt={flower.name} 
                                />
                                <Card.Body>
                                    <Card.Title>{flower.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Цена:</strong> {flower.price || 'нет в наличии'}
                                    </Card.Text>
                                    <Button 
                                        variant="primary" 
                                        onClick={() => handleAddToCart(flower)} 
                                    >
                                        Купить
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            <ToastContainer position="bottom-end" className="p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)}>
                    <Toast.Body>Товар добавлен в корзину</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
};

export default Flowers;
