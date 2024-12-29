import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addFlower, delFlower, updFlower } from './Flower';
import { useSelector } from 'react-redux';
import { userJwtSelector } from '../../reducer/UserStore/reducer';
import { addBouquet, delBouquet, updBouquet } from './Bouquet';
import { addProduct, delProduct, updProduct } from './Product';
//import { addSupply, delSupply, updSupply } from './Supply'; // Добавлена импорт функции для поставок

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const jwt = useSelector(userJwtSelector);

  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [showDeleteForm, setShowDeleteForm] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<string>('');
  const [newItem, setNewItem] = useState<string>('');
  const [itemId, setItemId] = useState<number | string>('');

  const handleLogout = () => {
    navigate("/get_report");
  };

  const handleLogout2 = () => {
    navigate("/get_report_sup");
  };

  const handleAddClick = (section: string) => {
    setCurrentSection(section); 
    setShowAddForm(true); 
  };
  const handleEditClick = (section: string) => {
    setCurrentSection(section);  
    setShowEditForm(true);
  };
  const handleDeleteClick = (section: string) => {
    setCurrentSection(section); 
    setShowDeleteForm(true); 
  };

  const handleCloseAddForm = () => setShowAddForm(false);
  const handleCloseEditForm = () => setShowEditForm(false);
  const handleCloseDeleteForm = () => setShowDeleteForm(false);

  const handleSaveNewItem = () => {
    if (currentSection === "Цветы") {
      addFlower(newItem, jwt ? jwt : "");
    }
    if (currentSection === "Букеты") {
      addBouquet(newItem, jwt ? jwt : "");
    }
    if (currentSection === "Товары для дома") {
      addProduct(newItem, jwt ? jwt : "");
    }
    /*if (currentSection === "Поставки") {
      addSupply(newItem, jwt ? jwt : ""); // Добавление новой поставки
    }*/
    setNewItem('');
    handleCloseAddForm();
  };

  const handleSaveEditedItem = () => {
    if (currentSection === "Цветы") {
      updFlower(newItem, itemId, jwt ? jwt : "");
    }
    if (currentSection === "Букеты") {
      updBouquet(newItem, itemId, jwt ? jwt : "");
    }
    if (currentSection === "Товары для дома") {
      updProduct(newItem, itemId, jwt ? jwt : "");
    }
    /*if (currentSection === "Поставки") {
      updSupply(newItem, itemId, jwt ? jwt : ""); // Редактирование поставки
    }*/
    setItemId('');
    handleCloseEditForm();
  };

  const handleDeleteItem = () => {
    if (itemId == '') return;
    if (currentSection === "Цветы") {
      delFlower(itemId, jwt ? jwt : "");
    }
    if (currentSection === "Букеты") {
      delBouquet(itemId, jwt ? jwt : "");
    }
    if (currentSection === "Товары для дома") {
      delProduct(itemId, jwt ? jwt : "");
    }
    /*if (currentSection === "Поставки") {
      delSupply(itemId, jwt ? jwt : ""); // Удаление поставки
    }*/
    setItemId('');
    handleCloseDeleteForm();
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Панель администратора</h1>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {/* Карточка для редактирования раздела "Цветы" */}
        <Col>
          <Card className="h-100 d-flex flex-column">
            <Card.Body className="flex-grow-1">
              <Card.Title>Цветы</Card.Title>
              <Card.Text>
                Редактируйте ассортимент цветов, добавляйте или удаляйте растения.
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="secondary" className="w-100" onClick={() => handleAddClick('Цветы')}>Добавить</Button>
              <Button variant="secondary" className="w-100 mt-2" onClick={() => handleEditClick('Цветы')}>Изменить</Button>
              <Button variant="secondary" className="w-100 mt-2" onClick={() => handleDeleteClick('Цветы')}>Удалить</Button>
            </Card.Footer>
          </Card>
        </Col>

        {/* Карточка для редактирования раздела "Букеты" */}
        <Col>
          <Card className="h-100 d-flex flex-column">
            <Card.Body className="flex-grow-1">
              <Card.Title>Букеты</Card.Title>
              <Card.Text>
                Изменяйте информацию о букетах, добавляйте новые или обновляйте существующие.
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="secondary" className="w-100" onClick={() => handleAddClick('Букеты')}>Добавить</Button>
              <Button variant="secondary" className="w-100 mt-2" onClick={() => handleEditClick('Букеты')}>Изменить</Button>
              <Button variant="secondary" className="w-100 mt-2" onClick={() => handleDeleteClick('Букеты')}>Удалить</Button>
            </Card.Footer>
          </Card>
        </Col>

        {/* Карточка для редактирования раздела "Товары для дома" */}
        <Col>
          <Card className="h-100 d-flex flex-column">
            <Card.Body className="flex-grow-1">
              <Card.Title>Товары для дома</Card.Title>
              <Card.Text>
                Управляйте ассортиментом товаров для дома. Добавляйте или редактируйте товары.
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="secondary" className="w-100" onClick={() => handleAddClick('Товары для дома')}>Добавить</Button>
              <Button variant="secondary" className="w-100 mt-2" onClick={() => handleEditClick('Товары для дома')}>Изменить</Button>
              <Button variant="secondary" className="w-100 mt-2" onClick={() => handleDeleteClick('Товары для дома')}>Удалить</Button>
            </Card.Footer>
          </Card>
        </Col>

        {/*
        <Col>
          <Card className="h-100 d-flex flex-column">
            <Card.Body className="flex-grow-1">
              <Card.Title>Поставки</Card.Title>
              <Card.Text>
                Управляйте поставками товаров. Добавляйте, редактируйте или удаляйте информацию о поставках.
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="secondary" className="w-100" onClick={() => handleAddClick('Поставки')}>Добавить</Button>
              <Button variant="secondary" className="w-100 mt-2" onClick={() => handleEditClick('Поставки')}>Изменить</Button>
              <Button variant="secondary" className="w-100 mt-2" onClick={() => handleDeleteClick('Поставки')}>Удалить</Button>
            </Card.Footer>
          </Card>
        </Col>*/}

        {/* Карточка для получения отчетов */}
        <Col>
          <Card className="h-100 d-flex flex-column">
            <Card.Body className="flex-grow-1">
              <Card.Title>Отчеты</Card.Title>
              <Card.Text>
                Получайте отчеты по продажам, статистике и другим данным.
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="success" className="w-100" onClick={handleLogout}>Получить отчеты по продажам</Button>
              <Button variant="success" className="w-100 mt-2" onClick={handleLogout2}>Получить отчеты по поставкам</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {/* Модальные окна для добавления, редактирования и удаления */}

      {/* Модальное окно для добавления */}
      <Modal show={showAddForm} onHide={handleCloseAddForm}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить новый элемент в раздел "{currentSection}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewItem">
              <Form.Label>Название нового элемента</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Введите название" 
                value={newItem} 
                onChange={(e) => setNewItem(e.target.value)} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddForm}>Закрыть</Button>
          <Button variant="primary" onClick={handleSaveNewItem}>Сохранить</Button>
        </Modal.Footer>
      </Modal>

      {/* Модальное окно для редактирования */}
      <Modal show={showEditForm} onHide={handleCloseEditForm}>
        <Modal.Header closeButton>
          <Modal.Title>Редактировать элемент в разделе "{currentSection}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formItemId">
              <Form.Label>ID элемента</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Введите ID элемента" 
                value={itemId} 
                onChange={(e) => setItemId(e.target.value)} 
              />
            </Form.Group>
            <Form.Group controlId="formEditedItem">
              <Form.Label>Новое название</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Введите новое название" 
                value={newItem} 
                onChange={(e) => setNewItem(e.target.value)} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditForm}>Закрыть</Button>
          <Button variant="primary" onClick={handleSaveEditedItem}>Сохранить изменения</Button>
        </Modal.Footer>
      </Modal>

      {/* Модальное окно для удаления */}
      <Modal show={showDeleteForm} onHide={handleCloseDeleteForm}>
        <Modal.Header closeButton>
          <Modal.Title>Удалить элемент из раздела "{currentSection}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDeleteItemId">
              <Form.Label>Введите ID элемента для удаления</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Введите ID элемента" 
                value={itemId} 
                onChange={(e) => setItemId(e.target.value)} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteForm}>Закрыть</Button>
          <Button variant="danger" onClick={handleDeleteItem}>Удалить</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminPage;
