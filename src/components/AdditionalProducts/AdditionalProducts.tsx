import React, { useEffect, useState } from 'react';
import { useCart } from '../CartPage/Cart';
import { Card, Container, Row, Col, Alert, Spinner, Button, Form, Toast, ToastContainer } from 'react-bootstrap';
import { userAdminSelector } from '../../reducer/UserStore/reducer';
import { useSelector } from 'react-redux';
import { getAllProducts } from './AdditionalProductsThunks'; 

interface product_data {
    name: string, 
    id: number,
    id_type: number,
    price: number
}

const AdditionalProducts: React.FC = () => {
    const isAdmin = useSelector(userAdminSelector);
    const [products, setProducts] = useState<product_data[]>([]); 
    const [filteredProducts, setFilteredProducts] = useState<product_data[]>([]); 
    const [error, setError] = useState<string>(''); 
    const [loading, setLoading] = useState<boolean>(true); 
    const { addToCart } = useCart(); 
    const [searchQuery, setSearchQuery] = useState<string>(''); 
    const [priceRange, setPriceRange] = useState<{ min: number, max: number }>({ min: 0, max: 10000 });
    const [showToast, setShowToast] = useState<boolean>(false);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsWithPrice = await getAllProducts();

                const filteredProducts = isAdmin
                    ? productsWithPrice
                    : productsWithPrice.filter(product => product.price !== null);

                setProducts(filteredProducts);
                setFilteredProducts(filteredProducts);
                setLoading(false);
            } catch (err) {
                setError('Unable to load data.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchProducts();
    }, [isAdmin]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
        const value = parseInt(e.target.value);
        setPriceRange(prevState => ({ ...prevState, [type]: value }));
    };

    const applyFilters = () => {
        const filtered = products.filter(product => {
            const matchesName = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
            return matchesName && matchesPrice;
        });
        setFilteredProducts(filtered);
    };

    const resetFilters = () => {
        setSearchQuery('');
        setPriceRange({ min: 0, max: 10000 });
        setFilteredProducts(products);
    };

    const handleAddToCart = (product: product_data) => {
        addToCart(product);
        setShowToast(true); 
        setTimeout(() => setShowToast(false), 3000); 
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Товары для дома и быта</h1>

            <Form className="mb-4">
                <Form.Group controlId="searchQuery" className="mb-3">
                    <Form.Label>Поиск по названию</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={searchQuery} 
                        onChange={handleSearchChange} 
                        placeholder="Введите название товара"
                        style={{ width: '300px' }}
                    />
                </Form.Group>

                <Form.Group controlId="priceRange" className="mt-3 mb-4">
                    <Form.Label>Диапозон цен</Form.Label>
                    <div>
                        <Form.Control 
                            type="number" 
                            value={priceRange.min} 
                            onChange={(e : React.ChangeEvent<HTMLInputElement>) => handlePriceChange(e, 'min')} 
                            placeholder="Мин. цена"
                            className="d-inline w-auto me-2"
                        />
                        -
                        <Form.Control 
                            type="number" 
                            value={priceRange.max} 
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
                    <p>Loading...</p>
                </div>
            )}

            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && !error && filteredProducts.length === 0 && (
                <Alert variant="warning" className="text-center">
                    No products found.
                </Alert>
            )}

            {!loading && !error && filteredProducts.length > 0 && (
                <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
                    {filteredProducts.map((product: product_data) => (
                        <Col key={product.id}>
                            <Card className="h-100">
                                <Card.Img 
                                    variant="top" 
                                    src={'/bulbasavr.gif'} 
                                    alt={product.name} 
                                />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Цена:</strong> {product.price || 'нет в наличии'}
                                    </Card.Text>
                                    <Button 
                                        variant="primary" 
                                        onClick={() => handleAddToCart(product)}
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

export default AdditionalProducts;
