import {Button, Col, Row} from "react-bootstrap";
import "./get-start.css";
import {useNavigate} from "react-router-dom";

const GetStart = () => {
    const navigate = useNavigate();

    const handleLogIn = () => {
        navigate("/authorization");
    }

    const handleRegister = () => {
        navigate("/registration");
    }
    return (
        <Row className="get-start-bg">
            <Col lg={6} className="text-center">
                <h2>Ready to Get Started?</h2>
                <p>Join us today and find the perfect project or freelancer for your needs.</p>
            </Col>
            <Col lg={6} className="text-center">
                <div className="mb-2">
                    <Button variant="outline-secondary"
                            className="w-50 rounded-0"
                            style={{height: "50px"}}
                            onClick={handleLogIn}
                    >Login</Button>
                </div>
                <div>
                    <Button variant="outline-secondary"
                            className="w-50 rounded-0"
                            style={{height: "50px"}}
                            onClick={handleRegister}
                    >Sign Up</Button>
                </div>
            </Col>
        </Row>
    );
}
export default GetStart;