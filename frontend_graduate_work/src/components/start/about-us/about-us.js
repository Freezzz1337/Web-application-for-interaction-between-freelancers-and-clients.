import {Row, Col, Image} from "react-bootstrap";

const AboutUs = () => {
    return (
        <Row className="mt-3">
            <Col lg={6}>
                <Image
                    src={require('../../../assets/img/about-us-img/aboutUs.jpg')}
                    alt="About Us"
                    fluid
                />
            </Col>
            <Col lg={6} className="start-bg text-center">
                <h2>About Us</h2>
                <p>Welcome to FreelanceHub, the premier platform connecting skilled freelancers with innovative clients. Our mission is to streamline project collaboration by ensuring high standards of quality, trust, and efficiency. We offer a diverse range of projects, secure payments, and a user-friendly interface to support your professional success.</p>
                <p>Join FreelanceHub today and take your freelancing or project management to the next level. Whether you're seeking top talent or exciting opportunities, our platform is designed to meet your needs and help you achieve your goals.</p>
            </Col>
        </Row>
    );
}
export default AboutUs;