import {Button, Container, Modal, Nav, Navbar} from "react-bootstrap";
import {useAuth} from "../../context/auth-context";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Chat from "../chat";

const Header = ({token}) => {
    const [show, setShow] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const {logout, userType} = useAuth();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        setShow(true);
    }

    const handleCloseLogoutModal = () => {
        setShow(false);
    }

    const handleLogout = () => {
        logout();
        navigate("/");
        setShow(false);
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


    const handleMainPage = () =>{
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
                                <Nav.Link onClick={handleLogoutClick}>Log out</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            )}

            <Chat show={showChat} onHide={() => setShowChat(false)}/>

            <Modal show={show} onHide={handleCloseLogoutModal} centered>
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
        </>
    );
}

export default Header;

