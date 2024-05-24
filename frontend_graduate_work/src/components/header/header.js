import {Alert, Button, Container, Modal, Nav, Navbar} from "react-bootstrap";
import {useAuth} from "../../context/auth-context";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Chat from "../chat";
import SupportModal from "../support-modal";
import LanguageSelector from "./language-selector";
import {useTranslation} from "react-i18next";

const Header = ({token}) => {
    const {t} = useTranslation();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showSupportModal, setShowSupportModal] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const {logout, userType} = useAuth();
    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(false);

    const handleSendMessage = () => {
        setShowAlert(true);
        handleCloseSupportModal();
        setTimeout(() => setShowAlert(false), 3000);
    };


    const handleSupportClick = () => {
        setShowSupportModal(true);
    }

    const handleCloseSupportModal = () => {
        setShowSupportModal(false);
    }
    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    }

    const handleCloseLogoutModal = () => {
        setShowLogoutModal(false);
    }

    const handleLogout = () => {
        logout();
        navigate("/");
        setShowLogoutModal(false);
    }

    const handleProfile = () => {
        navigate("/profile");
    }

    const handleMyProjects = () => {
        navigate("/projects");
    }

    const handleFindJobs = () => {
        navigate("/find-jobs")
    }

    const handleChatButtonClick = () => {
        setShowChat(!showChat);
    }


    const handleMainPage = () => {
        navigate("/");
    }
    const handleLogIn = () => {
        navigate("/authorization");
    }

    const handleRegister = () => {
        navigate("/registration");
    }
    return (
        <>
            {!token && (
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand onClick={handleMainPage}>FreelanceHub</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                            <Nav className="ml-auto">
                                <LanguageSelector/>
                                <Nav.Link onClick={handleLogIn}>{t("buttons.login")}</Nav.Link>
                                <Nav.Link onClick={handleRegister}>{t("buttons.register")}</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            )}
            {token && (
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand onClick={handleFindJobs}>FreelanceHub</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                            <Nav className="ml-auto">
                                <Nav.Link onClick={handleFindJobs}>{t("header.findJobs")}</Nav.Link>
                                <Nav.Link onClick={handleChatButtonClick}>{t("header.chat")}</Nav.Link>
                                {userType === "EMPLOYER" &&
                                    <Nav.Link onClick={handleMyProjects}>{t("header.myProjects")}</Nav.Link>
                                }
                                <Nav.Link onClick={handleProfile}>{t("header.profile")}</Nav.Link>
                                <LanguageSelector/>
                                <Nav.Link onClick={handleSupportClick}>{t("header.support")}</Nav.Link>
                                <Nav.Link onClick={handleLogoutClick}>{t("buttons.logOut")}</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            )}

            <Chat show={showChat} onHide={() => setShowChat(false)}/>

            <Modal show={showLogoutModal} onHide={handleCloseLogoutModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t("modalConfirmLogout.title")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t("modalConfirmLogout.body")}</Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleLogout} variant="primary">
                        {t("buttons.logOut")}
                    </Button>
                    <Button onClick={handleCloseLogoutModal} variant="secondary">
                        {t("buttons.cancel")}
                    </Button>
                </Modal.Footer>
            </Modal>

            <SupportModal show={showSupportModal} handleClose={handleCloseSupportModal}
                          handleSendMessage={handleSendMessage}/>
            {showAlert && (
                <div className="mt-3">
                    <Alert variant="success" className="text-center mt-3">
                        {t("header.alertText")}
                    </Alert>
                </div>
            )}
        </>
    );
}

export default Header;

