import {Alert, Button, Card, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../context/auth-context";
import {createProject, getAllProjectTypes, getSubprojectsTypes} from "../../../services/project-service";
import {createProjectValidation} from "../../../util/validation/project-validation";
import {useTranslation} from "react-i18next";

const ProjectCreate = () => {
    const {t} = useTranslation();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        budget: 0,
        deadline: "",
        projectType: "",
        subprojectType: ""
    });
    const {token} = useAuth();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [validErrors, setValidErrors] = useState({});
    const formRef = useRef(null);
    const [projectTypes, setProjectTypes] = useState(null);
    const [subprojectTypes, setSubprojectTypes] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const serverResponse = await getAllProjectTypes(token);
            if (serverResponse) {
                setProjectTypes(serverResponse);
            }
        };
        fetchData();
    }, [token]);

    useEffect(() => {
        if (formData.projectType !== "" && formData.projectType !== "0") {
            const fetchData = async () => {
                const serverResponse = await getSubprojectsTypes(token, formData.projectType);
                setSubprojectTypes(serverResponse);
            };
            fetchData();
        } else {
            setFormData({...formData, "subprojectType": ""});
        }
    }, [formData, formData.projectType, token]);

    const handleChange = async (e) => {
        e.preventDefault();
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newValidErrors = createProjectValidation(formData);
        setValidErrors(newValidErrors);
        if (Object.keys(newValidErrors).length === 0) {
            try {
                const serverResponse = await createProject(JSON.stringify(formData), token);
                if (serverResponse.response) {
                    navigate("/projects");
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
            <Container className="mt-5">
                <Row className="d-flex justify-content-center align-items-center">
                    <Col xs={12} md={9} lg={9} xl={8}>
                        <Card className="shadow-lg p-3 mb-5  rounded">
                            <Card.Body className="p-5">
                                <h2 className="text-uppercase text-center mb-5">{t("projectCreate.tittle")}</h2>
                                <Form ref={formRef} onSubmit={handleSubmit}>

                                    <Form.Group className="mb-4">
                                        <Form.Label>{t("projectFields.projectName")}</Form.Label>

                                        <Form.Control type="text"
                                                      className={`form-control-lg ${validErrors.title ? 'is-invalid' : ''}`}
                                                      name="title"
                                                      onChange={handleChange}
                                        />
                                        {validErrors.title &&
                                            <Form.Control.Feedback
                                                type="invalid">{validErrors.title}</Form.Control.Feedback>}
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>{t("projectFields.projectType")}</Form.Label>
                                        <Form.Select
                                            as="select"
                                            name="projectType"
                                            onChange={handleChange}
                                            required>
                                            <option value="0">{t("projectFields.selectProjectType")}</option>
                                            {projectTypes && projectTypes.map(projectType => (
                                                <option key={projectType.id} value={projectType.id}>
                                                    {projectType.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>{t("projectFields.subprojectType")}</Form.Label>
                                        <Form.Select
                                            as="select"
                                            name="subprojectType"
                                            onChange={handleChange}
                                            disabled={formData.projectType === "" || formData.projectType === "0"}
                                            required>
                                            {formData.projectType === "" || formData.projectType === "0" ? (
                                                <option value="0">{t("projectFields.selectSubprojectType")}</option>
                                            ) : (
                                                subprojectTypes && subprojectTypes.map(subprojectType => (
                                                    <option key={subprojectType.id} value={subprojectType.id}>
                                                        {subprojectType.name}
                                                    </option>
                                                ))
                                            )}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>{t("projectFields.description")}</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            className={`form-control-lg ${validErrors.description ? 'is-invalid' : ''}`}
                                            rows={7}
                                            name="description"
                                            onChange={handleChange}
                                        />
                                        {validErrors.description &&
                                            <Form.Control.Feedback
                                                type="invalid">{validErrors.description}</Form.Control.Feedback>}
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>{t("projectFields.budget")} (USD)</Form.Label>
                                        <InputGroup>
                                            <Form.Control type="number"
                                                          step="0.01"
                                                          className={`form-control-lg ${validErrors.budget ? 'is-invalid' : ''}`}
                                                          name="budget"
                                                          onChange={handleChange}
                                            />
                                            <InputGroup.Text>$</InputGroup.Text>
                                        </InputGroup>
                                        {validErrors.budget &&
                                            <Form.Control.Feedback
                                                type="invalid">{validErrors.budget}</Form.Control.Feedback>}
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label>{t("projectFields.deadline")}</Form.Label>
                                        <Form.Control type="datetime-local"
                                                      className={`form-control-lg ${validErrors.deadline ? 'is-invalid' : ''}`}
                                                      name="deadline"
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
                                                className="btn btn-outline-info btn-lg text-body w-100 rounded-0">{t("buttons.createProject")}</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
    )
}
export default ProjectCreate;