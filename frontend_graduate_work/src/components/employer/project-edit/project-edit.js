import {useNavigate, useParams} from "react-router-dom";
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
import {
    editProject,
    getAllProjectTypes,
    getProjectDetailsForEmployer,
    getSubprojectsTypes
} from "../../../services/project-service";
import {convertToDateTimeLocal} from "../../../util/convert-to-date-time-local";
import Spinner from "../../spinner";

const ProjectEdit = () => {
    const {projectId} = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [validErrors, setValidErrors] = useState({});
    const [error, setError] = useState(null);
    const {token} = useAuth();
    const [projectTypes, setProjectTypes] = useState(null);
    const [subprojectTypes, setSubprojectTypes] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            const serverResponseProjectDetailsForEmployer = await getProjectDetailsForEmployer(projectId, token);
            const serverResponseAllProjectTypes = await getAllProjectTypes(token);
            const serverResponseSubprojectsTypes = await getSubprojectsTypes(token, projectId);

            if (serverResponseProjectDetailsForEmployer &&
                serverResponseAllProjectTypes &&
                serverResponseSubprojectsTypes) {

                setProjectTypes(serverResponseAllProjectTypes);
                setSubprojectTypes(serverResponseSubprojectsTypes);

                setFormData(serverResponseProjectDetailsForEmployer.projectDetailsForEmployer);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (formData.projectType && formData.projectType.id) {
            const fetchSubprojectTypes = async () => {
                const serverResponse = await getSubprojectsTypes(token, formData.projectType.id);
                setSubprojectTypes(serverResponse);
            };

            fetchSubprojectTypes();
        }
    }, [formData.projectType]);


    const handleChange = (e) => {
        const {name, value} = e.target;

        if (name === "projectType" || name === "subprojectType") {
            const selectedIndex = e.target.selectedIndex;
            const selectedProjectTypeId = e.target.options[selectedIndex].value;
            const selectedProjectTypeName = e.target.options[selectedIndex].text;

            setFormData({
                ...formData,
                [name]: {
                    id: selectedProjectTypeId,
                    name: selectedProjectTypeName
                }
            });
        } else {
            setFormData({...formData, [name]: value});
        }
    }

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

    if (formData && Object.keys(formData).length === 0) {
        return (
            <div style={{height:"100%"}} className="d-flex justify-content-center align-items-center">
                <Spinner size="10rem"/>
            </div>
        );
    }

    return (
            <Container className="mt-5">
                <Row className="d-flex justify-content-center align-items-center ">
                    <Col xs={12} md={9} lg={8} xl={9}>
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
                                        <Form.Label>Project Type</Form.Label>
                                        <Form.Select
                                            as="select"
                                            name="projectType"
                                            onChange={handleChange}
                                            value={formData.projectType ? formData.projectType.id : ""}
                                            required>
                                            {projectTypes && projectTypes.map(projectType => (
                                                <option key={projectType.id} value={projectType.id}>
                                                    {projectType.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Subproject Type</Form.Label>
                                        <Form.Select
                                            as="select"
                                            name="subprojectType"
                                            onChange={handleChange}
                                            value={formData.projectType ? formData.subprojectType.id : ""}
                                            required>
                                            {formData.projectType && (formData.projectType.name === "" || formData.projectType.id === "0") ? (
                                                <option value="0">Select a subproject</option>
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
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            className={`form-control-lg ${validErrors.description ? 'is-invalid' : ''}`}
                                            rows={7}
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
                                                className="btn btn-info btn-lg text-body w-100 rounded-0">Edit Project</Button>
                                    </div>

                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
    );
}
export default ProjectEdit;