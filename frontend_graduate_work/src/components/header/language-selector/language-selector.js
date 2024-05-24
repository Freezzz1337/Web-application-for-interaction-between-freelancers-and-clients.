import {useTranslation} from "react-i18next";
import {NavDropdown} from "react-bootstrap";

const LanguageSelector = () => {
    const { i18n,t } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <NavDropdown  title={i18n.language.toUpperCase()} menuVariant="dark">
            <NavDropdown.Item onClick={() => changeLanguage('en')}>{t("languageSelector.english")}</NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeLanguage('uk')}>{t("languageSelector.ukrainian")}</NavDropdown.Item>
        </NavDropdown>
    );
}
export default LanguageSelector;