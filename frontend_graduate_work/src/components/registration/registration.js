import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useRef, useState} from "react";
import {convertFileToBase64} from "../../util/convert-file-to-base64";
import {Link, useNavigate} from "react-router-dom";
import {registration} from "../../services/auth-service";
import {registrationValidation} from "../../util/validation/auth-validation";

const Registration = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        userType: "freelancer",
        username: "",
        email: "",
        password: "",
        bio: "",
        profilePicture: ""
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [validErrors, setValidErrors] = useState({});
    const formRef = useRef(null);

    const handleChange = (e) => {
        if (e.target.type === "file") {
            convertFileToBase64(e.target.files[0], (base64String) => {
                setFormData({...formData, [e.target.name]: base64String})
            });
        } else {
            setFormData({...formData, [e.target.name]: e.target.value});
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newValidErrors = registrationValidation(formData);
        setValidErrors(newValidErrors);

        if (Object.keys(newValidErrors).length === 0) {
            try {
                const serverResponse = await registration(JSON.stringify(formData));
                if (serverResponse.response) {
                    navigate("/authorization");
                } else {
                    setError(serverResponse.description);
                }
            } catch (error) {
                console.log("Login failed:", error);
                setError("Unexpected error occurred.");
            } finally {
                formRef.current.reset();
            }
        }
    }

    return (
        <section className="vh-100 bg-image mt-5">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3 ">
                <Container className="h-100 ">
                    <Row className="d-flex justify-content-center align-items-center h-100">
                        <Col xs={12} md={9} lg={7} xl={6}>
                            <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                                <Card.Body className="p-5">
                                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                                    <Form ref={formRef} onSubmit={handleSubmit}>

                                        <Form.Group className="mb-4">
                                            <Form.Label>Your First Name and Last Name</Form.Label>

                                            <Form.Control type="text"
                                                 className={`form-control-lg ${validErrors.fullName ? 'is-invalid' : ''}`}
                                                          name="fullName"
                                                          onChange={handleChange}
                                            />
                                            {validErrors.fullName &&
                                                <Form.Control.Feedback
                                                    type="invalid">{validErrors.fullName}</Form.Control.Feedback>}
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            <Form.Label>User Type</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="userType"
                                                onChange={handleChange}
                                                required>
                                                <option value="freelancer">Freelancer</option>
                                                <option value="employer">Employer</option>
                                            </Form.Control>
                                        </Form.Group>

                                        {/*<Form.Group className="mb-4">*/}
                                        {/*    <Form.Label>Your Username</Form.Label>*/}

                                        {/*    <Form.Control type="text"*/}
                                        {/*         className={`form-control-lg ${validErrors.fullName ? 'is-invalid' : ''}`}*/}
                                        {/*                  name="username"*/}
                                        {/*                  onChange={handleChange}*/}
                                        {/*    />*/}
                                        {/*    {validErrors.fullName &&*/}
                                        {/*        <Form.Control.Feedback*/}
                                        {/*            type="invalid">{validErrors.fullName}</Form.Control.Feedback>}*/}
                                        {/*</Form.Group>*/}

                                        <Form.Group className="mb-4">
                                            <Form.Label>Your Email</Form.Label>
                                            <Form.Control type="email"
                                                 className={`form-control-lg ${validErrors.email ? 'is-invalid' : ''}`}
                                                          name="email"
                                                          onChange={handleChange}
                                                          required
                                            />
                                            {validErrors.email &&
                                                <Form.Control.Feedback
                                                    type="invalid">{validErrors.email}</Form.Control.Feedback>}
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password"
                                                 className={`form-control-lg ${validErrors.password ? 'is-invalid' : ''}`}
                                                          name="password"
                                                          onChange={handleChange}
                                                          required/>
                                            {validErrors.password &&
                                                <Form.Control.Feedback
                                                    type="invalid">{validErrors.password}</Form.Control.Feedback>}
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            <Form.Label>Bio</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="bio"
                                                onChange={handleChange}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            <Form.Label>Choose your avatar</Form.Label>
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
                                                    className="btn btn-info btn-lg gradient-custom-4 text-body w-100 rounded-0">Register</Button>
                                        </div>

                                        <p className="text-center text-muted mt-5 mb-0">Have already an
                                            account? <Link  to="/authorization" className="fw-bold">
                                                <u>Login here</u>
                                            </Link> </p>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </section>
    );
}

export default Registration;