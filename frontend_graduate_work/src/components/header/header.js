import {Alert, Button, Container, Modal, Nav, Navbar} from "react-bootstrap";
import {useAuth} from "../../context/auth-context";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Chat from "../chat";
import SupportModal from "../support-modal";

const Header = ({token}) => {
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
                                <Nav.Link onClick={handleLogIn}>Log in</Nav.Link>
                                <Nav.Link onClick={handleRegister}>Register</Nav.Link>
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
                                <Nav.Link onClick={handleFindJobs}>Find Jobs</Nav.Link>
                                <Nav.Link onClick={handleChatButtonClick}>Chat</Nav.Link>
                                {userType === "EMPLOYER" &&
                                    <Nav.Link onClick={handleMyProjects}>My Projects</Nav.Link>
                                }
                                <Nav.Link onClick={handleProfile}>Profile</Nav.Link>
                                <Nav.Link onClick={handleSupportClick}>Support</Nav.Link>
                                <Nav.Link onClick={handleLogoutClick}>Log out</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            )}

            <Chat show={showChat} onHide={() => setShowChat(false)}/>

            <Modal show={showLogoutModal} onHide={handleCloseLogoutModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to log out?</Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleLogout} variant="primary">
                        Logout
                    </Button>
                    <Button onClick={handleCloseLogoutModal} variant="secondary">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <SupportModal show={showSupportModal} handleClose={handleCloseSupportModal}
                          handleSendMessage={handleSendMessage}/>
            {showAlert && (
                <div className="mt-3">
                    <Alert variant="success" className="text-center mt-3">
                        Thank you for contacting us, we will get back to you soon.
                    </Alert>
                </div>
            )}

        </>
    );
}

export default Header;

