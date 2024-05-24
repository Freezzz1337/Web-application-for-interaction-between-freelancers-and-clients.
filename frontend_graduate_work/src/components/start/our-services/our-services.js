import {Card, Col, Container, Row} from "react-bootstrap";
import {MdEdit, MdOutlineDone, MdOutlineSearch} from "react-icons/md";
import {useTranslation} from "react-i18next";

const OurServices = ()=>{
    const {t} = useTranslation();

    return(
        <Container className="my-5">
            <h2 className="text-center">{t("ourServices.title")}</h2>
            <Row className="text-center">
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title><MdOutlineSearch /> {t("ourServices.card1.title")}</Card.Title>
                            <Card.Text>{t("ourServices.card1.text")}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title><MdOutlineDone /> {t("ourServices.card2.title")}</Card.Title>
                            <Card.Text>{t("ourServices.card2.text")}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title><MdEdit /> {t("ourServices.card3.title")}</Card.Title>
                            <Card.Text>{t("ourServices.card3.text")}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </Container>
    );
}
export default OurServices;