import {Col, Container, Row} from "react-bootstrap";
import "./start.css";
import {Link} from "react-router-dom";

const Start = () => {
    return (
        <Container className="text-center main-container">
            <Row>
                <Col xs={12} md={6}>
                    <Link to="/authorization" className="no-underline">
                        <div
                            className="rectangle  p-3 mb-5 bg-white rounded d-flex align-items-center justify-content-center">
                            <h1>Log in</h1>
                        </div>
                    </Link>

                </Col>
                <Col xs={12} md={6}>
                    <Link to="/registration" className="no-underline">
                        <div
                            className="rectangle  p-3 mb-5 bg-white rounded d-flex align-items-center justify-content-center">
                            <h1>Registration</h1>
                        </div>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default Start;