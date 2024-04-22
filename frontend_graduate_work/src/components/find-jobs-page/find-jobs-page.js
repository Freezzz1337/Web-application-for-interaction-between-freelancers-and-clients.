import {Button, Col, Container, Form, FormControl, InputGroup, ListGroup, Row} from "react-bootstrap";
import {BiSearch} from "react-icons/bi";

const FindJobsPage = () => {
    return (
        <Container>
            <Row>
                <Col xs={12} md={12} className="mt-3">
                    <InputGroup>
                        <FormControl
                            className={`border rounded-pill shadow`}
                            type="search"
                            placeholder="Search by name"
                        />
                        <Button
                            variant="outline-secondary"
                            className="bg-white border rounded-pill shadow"
                            type="submit"
                        >
                            Search <BiSearch/>
                        </Button>
                    </InputGroup>
                </Col>

            </Row>

            <Row>
                {/* Ліва частина сторінки */}
                <Col xs={12} md={3}>
                    <h5 className="mt-3">Фільтр пошуку</h5>
                    <Form>
                        <Form.Group controlId="formSearch">
                            <Form.Control type="text" placeholder="Пошук проектів" />
                        </Form.Group>
                        {/* Додайте додаткові елементи для фільтрації */}
                        <div className="text-right">
                            <Button variant="primary" type="submit">
                                Застосувати фільтри
                            </Button>
                        </div>
                    </Form>
                </Col>

                {/* Права частина сторінки */}
                <Col xs={12} md={9}>
                    <div className="mt-3">
                        <h5>Список проектів</h5>
                        <ListGroup>
                            {/* Додайте список проектів */}
                            <ListGroup.Item>Проект 1</ListGroup.Item>
                            <ListGroup.Item>Проект 2</ListGroup.Item>
                            <ListGroup.Item>Проект 3</ListGroup.Item>
                            {/* Додайте додаткові елементи списку */}
                        </ListGroup>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
export default FindJobsPage;