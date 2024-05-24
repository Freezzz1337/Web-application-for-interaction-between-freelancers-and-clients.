import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row, Form, Card, Alert} from "react-bootstrap";
import {editProfileValidation} from "../../util/validation/profile-validation";
import {editProfile} from "../../services/profile-service";
import {useAuth} from "../../context/auth-context";
import {convertFileToBase64} from "../../util/convert-file-to-base64";
import Spinner from "../spinner";
import {useTranslation} from "react-i18next";

const ProfileEdit = () => {
    const {t} = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [error, setError] = useState(null);
    const [validErrors, setValidErrors] = useState({});
    const {token} = useAuth();

    useEffect(() => {
        if (location.state && location.state.userData) {
            const {fullName, bio, profilePicture} = location.state.userData;
            setFormData({fullName, bio, profilePicture});
        }
    }, [location.state]);


    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === 'profilePicture') {
            convertFileToBase64(e.target.files[0], (base64String) => {
                setFormData({...formData, [e.target.name]: base64String})
            });
        } else {
            setFormData({...formData, [name]: value});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newValidErrors = editProfileValidation(formData);
        setValidErrors(newValidErrors);
        if (Object.keys(newValidErrors).length === 0) {
            try {
                const serverResponse = await editProfile(JSON.stringify(formData), token);
                if (serverResponse.response) {
                    navigate("/profile");
                } else {
                    setError(serverResponse.description);
                }
            } catch (error) {
                console.log("Login failed:", error);
                setError("Unexpected error occurred.");
            }
        }
    }

    if (!formData) {
        return (
            <div style={{height:"100%"}} className="d-flex justify-content-center align-items-center">
                <Spinner size="10rem"/>
            </div>
        );
    }

    return (
        <Container className="mt-5">
            <Row className="d-flex justify-content-center align-items-center ">
                <Col xs={12} md={9} lg={9} xl={8}>
                    <Card className="shadow-lg p-3 mb-5  rounded">
                        <Card.Body className="p-5">
                            <h2 className="text-uppercase text-center mb-5">{t("profileEdit.title")}</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-4">
                                    <Form.Label>{t("profileEdit.fullName")}</Form.Label>

                                    <Form.Control type="text"
                                                  className={`form-control-lg ${validErrors.fullName ? 'is-invalid' : ''}`}
                                                  name="fullName"
                                                  value={formData.fullName}
                                                  onChange={handleChange}
                                    />
                                    {validErrors.fullName &&
                                        <Form.Control.Feedback
                                            type="invalid">{validErrors.fullName}</Form.Control.Feedback>}
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>{t("profileEdit.bio")}</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={7}
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>{t("profileEdit.profilePicture")}</Form.Label>
                                    <Form.Control type="file"
                                                  accept="image/*"
                                                  className="form-control-lg"
                                                  name="profilePicture"
                                                  onChange={handleChange}
                                    />
                                </Form.Group>

                                {error &&
                                    <div className="mt-3">
                                        <Alert variant="danger">
                                            {error}
                                        </Alert>
                                    </div>
                                }

                                <div className="d-flex justify-content-center">
                                    <Button type="submit" variant="info"
                                            className="btn btn-info btn-lg text-body w-100 rounded-0">{t("buttons.edit")}</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default ProfileEdit;