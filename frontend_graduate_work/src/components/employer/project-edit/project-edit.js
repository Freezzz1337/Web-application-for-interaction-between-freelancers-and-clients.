import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuth} from "../../../context/auth-context";
import {
    Alert,
    Button,
    Card,
    Col,
    Container,
    Form,
    InputGroup,
    Row
} from "react-bootstrap";
import {editProjectValidation} from "../../../util/validation/project-validation";
import {editProject} from "../../../services/project-service";

const ProjectEdit = () => {
    const location = useLocation();
    const [formData, setFormData] = useState();
    const [validErrors, setValidErrors] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {token} = useAuth();

    useEffect(() => {
        if (location.state && location.state.project) {
            const {title, description, budget, deadline, id} = location.state.project;
            setFormData({title, description, budget, deadline, id});
        }
    }, [location.state]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const convertToDateTimeLocal = (isoDateTimeString) => {
        const date = new Date(isoDateTimeString);
        const offset = date.getTimezoneOffset();
        date.setMinutes(date.getMinutes() - offset);
        return date.toISOString().slice(0, -1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newValidErrors = editProjectValidation(formData);
        setValidErrors(newValidErrors);

        if (Object.keys(newValidErrors).length === 0) {
            try {
                const serverResponse = await editProject(JSON.stringify(formData), token);
                if (serverResponse.response) {
                    navigate("/projects");
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
        return <div><h2>Wait a moment!</h2></div>
    }

    return (
        <section className="mt-5">
            <Container>
                <Row className="d-flex justify-content-center align-items-center ">
                    <Col xs={12} md={9} lg={7} xl={6}>
                        <Card className="shadow-lg p-3 mb-5  rounded">
                            <Card.Body className="p-5">
                                <h2 className="text-uppercase text-center mb-5">Edit Project</h2>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Project name</Form.Label>

                                        <Form.Control type="text"
                                                      className={`form-control-lg ${validErrors.title ? 'is-invalid' : ''}`}
                                                      name="title"
                                                      value={formData.title}
                                                      onChange={handleChange}
                                        />
                                        {validErrors.title &&
                                            <Form.Control.Feedback
                                                type="invalid">{validErrors.title}</Form.Control.Feedback>}
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            className={`form-control-lg ${validErrors.description ? 'is-invalid' : ''}`}
                                            rows={3}
                                            value={formData.description}
                                            name="description"
                                            onChange={handleChange}
                                        />
                                        {validErrors.description &&
                                            <Form.Control.Feedback
                                                type="invalid">{validErrors.description}</Form.Control.Feedback>}
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Budget (USD)</Form.Label>
                                        <InputGroup>
                                            <Form.Control type="number"
                                                          step="0.01"
                                                          className={`form-control-lg ${validErrors.budget ? 'is-invalid' : ''}`}
                                                          name="budget"
                                                          value={formData.budget}
                                                          onChange={handleChange}
                                            />
                                            <InputGroup.Text>$</InputGroup.Text>

                                        </InputGroup>
                                        {validErrors.budget &&
                                            <Form.Control.Feedback
                                                type="invalid">{validErrors.budget}</Form.Control.Feedback>}
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Deadline</Form.Label>
                                        <Form.Control type="datetime-local"
                                                      className={`form-control-lg ${validErrors.deadline ? 'is-invalid' : ''}`}
                                                      name="deadline"
                                                      value={formData.deadline ? convertToDateTimeLocal(formData.deadline) : ''}
                                                      onChange={handleChange}
                                        />
                                        {validErrors.deadline &&
                                            <Form.Control.Feedback
                                                type="invalid">{validErrors.deadline}</Form.Control.Feedback>}
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
                                                className="btn btn-info btn-lg text-body w-100 rounded-0">Create
                                            Project</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
export default ProjectEdit;