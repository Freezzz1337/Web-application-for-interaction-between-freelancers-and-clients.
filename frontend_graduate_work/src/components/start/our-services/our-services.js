import {Card, Col, Container, Row} from "react-bootstrap";
import {MdEdit, MdOutlineDone, MdOutlineSearch} from "react-icons/md";

const OurServices = ()=>{
    return(
        <Container className="my-5">
            <h2 className="text-center">Our services</h2>
            <Row className="text-center">
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title><MdOutlineSearch /> Search for Freelancers</Card.Title>
                            <Card.Text>We will help you find the best specialists for your project.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title><MdOutlineDone /> Quality assurance</Card.Title>
                            <Card.Text>We ensure quality and reliability of work.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title><MdEdit /> Publication of Projects</Card.Title>
                            <Card.Text>Create projects and attract freelancers with the right skills.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </Container>
    );
}
export default OurServices;