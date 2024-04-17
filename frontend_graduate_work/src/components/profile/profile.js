import "./profile.css"
import {useAuth} from "../../context/auth-context";
import {Col, Container, Row, Image, Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getUserData} from "../../services/profile-service";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const {token} = useAuth();
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const serverResponse = await getUserData(token);
            if (serverResponse) {
                setUserData(serverResponse);
            }
        };
        fetchData();
    }, [token]);

    const handleEditProfile = () => {
        navigate("/profile/edit", {state: {userData}});
    }


    if (!userData) {
        return <div><h2>Wait a moment!</h2></div>
    }

    return (

        <Container className="mt-3">
            <Row className="align-items-center profile-header-gradient rounded-top-5">
                <Col lg={3} md={5} className="d-flex align-items-center justify-content-center">
                    <Image src={`data:image/jpeg;base64,${userData.profilePicture}`} roundedCircle fluid
                           className="rounded-circle" style={{width: '200px', height: '200px'}}/>
                </Col>
                <Col lg={9} md={7} className="text-center text-md-start">
                    <h3>{userData.fullName}</h3>
                    <p>{userData.userType === 'FREELANCER' ? 'Freelancer' : 'Employer'}</p>
                    <Button variant="btn btn-outline-light" onClick={handleEditProfile}>
                        Edit profile
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-pencil" viewBox="0 0 16 16">
                            <path
                                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"></path>
                        </svg>

                    </Button>
                </Col>
            </Row>
            <Row className="shadow-lg">
                <Col>
                    <h2 className="mt-2">About me</h2>
                    <p>{userData.bio}</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Profile;