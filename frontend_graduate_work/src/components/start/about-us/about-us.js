import {Row, Col, Image} from "react-bootstrap";
import {useTranslation} from "react-i18next";

const AboutUs = () => {
    const {t} = useTranslation();
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
                <h2>{t("aboutUs.title")}</h2>
                <p>{t("aboutUs.text1")}</p>
                <p>{t("aboutUs.text2")}</p>
            </Col>
        </Row>
    );
}
export default AboutUs;