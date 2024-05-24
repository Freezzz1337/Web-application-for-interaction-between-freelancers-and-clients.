import {Button, Col, Row} from "react-bootstrap";
import "./get-start.css";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const GetStart = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleLogIn = () => {
        navigate("/authorization");
    }

    const handleRegister = () => {
        navigate("/registration");
    }
    return (
        <Row className="get-start-bg">
            <Col lg={6} className="text-center">
                <h2>{t("getStart.title")}</h2>
                <p>{t("getStart.text")}</p>
            </Col>
            <Col lg={6} className="text-center">
                <div className="mb-2">
                    <Button variant="outline-secondary"
                            className="w-50 rounded-0"
                            style={{height: "50px"}}
                            onClick={handleLogIn}
                    >{t("buttons.login")}</Button>
                </div>
                <div>
                    <Button variant="outline-secondary"
                            className="w-50 rounded-0"
                            style={{height: "50px"}}
                            onClick={handleRegister}
                    >{t("buttons.signUp")}</Button>
                </div>
            </Col>
        </Row>
    );
}
export default GetStart;