import {Button, Card, Col, Container, Row} from "react-bootstrap";

const ProjectPage = () => {
    const projects = [
        { id: 1, title: 'Проект 1', status: 'Активний' },
        { id: 2, title: 'Проект 2', status: 'В розробці' },
        { id: 3, title: 'Проект 3', status: 'Завершений' },
        { id: 4, title: 'Проект 3', status: 'Завершений' },
        { id: 4, title: 'Проект 3', status: 'Завершений' },
    ];

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6} className="text-center">
                    <h2 >Мої проекти</h2>
                    <Button variant="primary" href="/create-project" block>Створити новий проект</Button>
                </Col>
            </Row>
            <Row className="mt-3">
                {projects.map(project => (
                    <Col key={project.id} md={4} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{project.title}</Card.Title>
                                <Card.Text>
                                    Статус: {project.status}
                                </Card.Text>
                                <Button variant="info" href={`/projects/${project.id}`}>Детальніше</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
export default ProjectPage;