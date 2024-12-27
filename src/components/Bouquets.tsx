import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useSelector } from 'react-redux';
import { userAdminSelector, userJwtSelector } from '../reducer/UserStore/reducer';
import { useCart } from './context/CartContext'; 
import { Button, Container, Row, Col, Card, Spinner, Alert, Modal, Form, Toast, ToastContainer } from 'react-bootstrap';

const Bouquets: React.FC = () => {
    const jwt = useSelector(userJwtSelector);
    const isAdmin = useSelector(userAdminSelector);
    const [bouquets, setBouquets] = useState<any[]>([]);
    const [filteredBouquets, setFilteredBouquets] = useState<any[]>([]);
    const [error, setError] = useState<string>('');
    const [bouquetFlowers, setBouquetFlowers] = useState<{ [key: number]: string[] }>({});
    const [loading, setLoading] = useState<boolean>(true); 
    const { addToCart } = useCart(); 
    const [showModal, setShowModal] = useState(false);
    const [currentBouquet, setCurrentBouquet] = useState<any>(null); 
    const [showToast, setShowToast] = useState<boolean>(false); 

    // Фильтрация
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [priceRange, setPriceRange] = useState<{ min: number, max: number }>({ min: 0, max: 20000 });
    const [tempSearchQuery, setTempSearchQuery] = useState<string>('');
    const [tempPriceRange, setTempPriceRange] = useState<{ min: number, max: number }>({ min: 0, max: 20000 });

    // Функция для получения цены букета
    const fetchBouquetPrice = async (bouquetId: number) => {
        try {
            const response = await axios.get(`api/cost/2/${bouquetId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            return response.data; 
        } catch (err) {
            console.error(`Ошибка при получении цены для букета ${bouquetId}`, err);
            return null;
        }
    };

    const fetchFlowersForBouquet = async (bouquetId: number) => {
        try {
            const response = await axios.get(`api/compound_bouquet_flowers/${bouquetId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            setBouquetFlowers((prevState) => ({
                ...prevState,
                [bouquetId]: response.data, 
            }));
        } catch (err) {
            console.error(`Ошибка при получении состава цветов для букета ${bouquetId}`, err);
        }
    };

    const fetchBouquets = async () => {
        try {
            const response = await axios.get('api/all_bouquets', {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            const bouquetsData = response.data;
            const bouquetsWithPrice = await Promise.all(
                bouquetsData.map(async (bouquet: any) => {
                    const price = await fetchBouquetPrice(bouquet.id);
                    await fetchFlowersForBouquet(bouquet.id); 
                    return { ...bouquet, price };
                })
            );
            const filteredBouquets = isAdmin ? bouquetsWithPrice : bouquetsWithPrice.filter(bouquet => bouquet.price !== null);
            setBouquets(filteredBouquets);
            setFilteredBouquets(filteredBouquets);
            setLoading(false);
        } catch (err) {
            setError('Не удалось загрузить данные.');
            setLoading(false);
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBouquets();
    }, [jwt]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempSearchQuery(e.target.value);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
        const value = parseInt(e.target.value);
        const newPriceRange = { ...tempPriceRange, [type]: value };
        setTempPriceRange(newPriceRange);
    };

    const applyFilters = () => {
        const filtered = bouquets.filter(bouquet => {
            const matchesName = bouquet.name.toLowerCase().includes(tempSearchQuery.toLowerCase());
            const matchesPrice = bouquet.price >= tempPriceRange.min && bouquet.price <= tempPriceRange.max;
            return matchesName && matchesPrice;
        });
        setFilteredBouquets(filtered);
    };

    const resetFilters = () => {
        setTempSearchQuery('');
        setTempPriceRange({ min: 0, max: 20000 });
        setFilteredBouquets(bouquets);
    };

    const handleAddToCart = (bouquet: any) => {
        addToCart(bouquet);
        setShowToast(true); 
        setTimeout(() => setShowToast(false), 3000); 
    };

    const handleShowModal = (bouquet: any) => {
        setCurrentBouquet(bouquet);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Готовые букеты</h1>

            <Form className="mb-4">
                <Form.Group controlId="searchQuery" className="mb-3">
                    <Form.Label>Поиск по названию</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={tempSearchQuery} 
                        onChange={handleSearchChange} 
                        placeholder="Введите название букета" 
                        style={{ width: '300px' }}
                    />
                </Form.Group>

                <Form.Group controlId="priceRange" className="mt-3 mb-4">
                    <Form.Label>Диапазон цен</Form.Label>
                    <div>
                        <Form.Control 
                            type="number" 
                            value={tempPriceRange.min} 
                            onChange={(e : any) => handlePriceChange(e, 'min')} 
                            placeholder="Мин. цена"
                            className="d-inline w-auto me-2"
                        />
                        - 
                        <Form.Control 
                            type="number" 
                            value={tempPriceRange.max} 
                            onChange={(e : any) => handlePriceChange(e, 'max')} 
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

            {!loading && !error && filteredBouquets.length === 0 && (
                <Alert variant="warning" className="text-center">
                    Нет данных о букетах.
                </Alert>
            )}

            {!loading && !error && filteredBouquets.length > 0 && (
                <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
                    {filteredBouquets.map((bouquet: any) => (
                        <Col key={bouquet.id}>
                            <Card className="h-100">
                                <Card.Img 
                                    variant="top" 
                                    src={bouquet.image || '/bulbasavr.gif'} 
                                    alt={bouquet.name} 
                                />
                                <Card.Body>
                                    <Card.Title>{bouquet.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Цена:</strong> {bouquet.price || 'нет в наличии'}
                                    </Card.Text>
                                    <Button variant="success" onClick={() => handleShowModal(bouquet)} className="me-5">
                                        Состав
                                    </Button>
                                    <Button 
                                        variant="primary" 
                                        onClick={() => handleAddToCart({ 
                                            id: bouquet.id, 
                                            name: bouquet.name, 
                                            price: bouquet.price, 
                                            image: bouquet.image || '/bulbasavr.gif' 
                                        })}
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

            {/* Модальное окно с составом */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Состав букета</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentBouquet ? (
                        <ul>
                            {bouquetFlowers[currentBouquet.id]?.map((flower, index) => (
                                <li key={index}>{flower}</li>
                            )) || <p>Состав не загружен...</p>}
                        </ul>
                    ) : (
                        <p>Загрузка состава...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal} className="ms-4">
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Bouquets;
