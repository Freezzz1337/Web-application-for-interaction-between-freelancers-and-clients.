import {Col, Container, Row} from "react-bootstrap";
import "./footer.css"

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 bg-light">
            <Container>
                <p className="float-end mb-1">
                    <a href="#">Back to top</a>
                </p>
                <p className="mb-1">© All rights reserved</p>
            </Container>
        </footer>
    );
};

export default Footer;

