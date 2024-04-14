import {Button, Container, Modal, Nav, Navbar} from "react-bootstrap";
import {useAuth} from "../../context/auth-context";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const [show, setShow] = useState(false);
    const {logout} = useAuth();
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
    }

    const handleProfile = () => {
        navigate("/profile");
    }

    const handleMyProjects = () => {
        navigate("/projects");
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand>My Social Network</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="ml-auto">
                            <Nav.Link>Home</Nav.Link>
                            <Nav.Link>Explore</Nav.Link>
                            <Nav.Link>Notifications</Nav.Link>
                            <Nav.Link onClick={handleMyProjects}>My Projects</Nav.Link>
                            <Nav.Link onClick={handleProfile}>Profile</Nav.Link>
                            <Nav.Link onClick={handleLogoutClick}>Log out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


            <Modal show={show} onHide={handleCloseLogoutModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to log out?</Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseLogoutModal} variant="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleLogout} variant="primary">
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default Header;