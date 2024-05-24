import {Container} from "react-bootstrap";
import "./footer.css"
import {useTranslation} from "react-i18next";

const Footer = () => {
    const {t} =useTranslation();
    return (
        <footer className="footer mt-auto py-3 bg-light">
            <Container>
                <p className="float-end mb-1">
                    <a href="#">{t("footer.text1")}</a>
                </p>
                <p className="mb-1">© {t("footer.text2")}</p>
            </Container>
        </footer>
    );
};

export default Footer;

