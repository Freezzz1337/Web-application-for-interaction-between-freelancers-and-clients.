import {Card, Col, Row} from "react-bootstrap";
import "./testimonials.css";
import {useTranslation} from "react-i18next";
const Testimonials = () => {
    const {t} = useTranslation();

    return (
        <div className="py-5">
            <h2 className="text-center mb-4">{t("testimonials.title")}</h2>
            <Row className="justify-content-center">
                <Col md={6} lg={4} className="mb-4">
                    <Card className="h-100">
                        <Card.Body>
                            <Card.Text className="fst-italic">
                                {t("testimonials.card1.text")}
                            </Card.Text>
                            <Card.Footer className="text-end">
                                <small className="text-muted">{t("testimonials.card1.name")}</small>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={4} className="mb-4">
                    <Card className="h-100">
                        <Card.Body>
                            <Card.Text className="fst-italic">
                                {t("testimonials.card2.text")}
                            </Card.Text>
                            <Card.Footer className="text-end">
                                <small className="text-muted">{t("testimonials.card2.name")}</small>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </div>
    );
}
export default Testimonials;