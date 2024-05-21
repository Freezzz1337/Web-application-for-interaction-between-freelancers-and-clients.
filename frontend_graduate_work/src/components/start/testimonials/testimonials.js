import {Card, Col, Row} from "react-bootstrap";
import "./testimonials.css";
const Testimonials = () => {
    return (
        <div className="py-5">
            <h2 className="text-center mb-4">What Our Users Say</h2>
            <Row className="justify-content-center">
                <Col md={6} lg={4} className="mb-4">
                    <Card className="h-100">
                        <Card.Body>
                            <Card.Text className="fst-italic">
                                "This platform has been a game-changer for my freelance career!"
                            </Card.Text>
                            <Card.Footer className="text-end">
                                <small className="text-muted">- John Doe</small>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={4} className="mb-4">
                    <Card className="h-100">
                        <Card.Body>
                            <Card.Text className="fst-italic">
                                "I found the perfect freelancer for my project in no time."
                            </Card.Text>
                            <Card.Footer className="text-end">
                                <small className="text-muted">- Jane Smith</small>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </div>
    );
}
export default Testimonials;