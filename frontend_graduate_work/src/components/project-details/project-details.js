import {useAuth} from "../../context/auth-context";
import {useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {
    getProjectDetailsForFreelancer
} from "../../services/project-service";
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardText,
    Form,
    Button, InputGroup, Alert
} from 'react-bootstrap';
import {BiMoney, BiInfoCircle} from 'react-icons/bi';
import formatCreatedAtDate from "../../util/format-created-at-date";
import {createCommentValidation} from "../../util/validation/comment-validation";
import {createProjectComment} from "../../services/project-comment-service";
import ProjectDetailsComment from "../project-details-comment";

const ProjectDetails = () => {
    const {token, userType} = useAuth();
    const {projectId} = useParams();
    const [project, setProject] = useState(null);
    const [comments, setComments] = useState(null);
    const [error, setError] = useState(null);
    const [validErrors, setValidErrors] = useState({});
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        projectId: projectId,
        commentText: "",
        proposedPrice: ""
    });
    useEffect(() => {
        const fetchData = async () => {
            const serverResponse = await getProjectDetailsForFreelancer(projectId, token);
            if (serverResponse.projectCommentGetAllForProjectDetails.length > 0) {
                setProject(serverResponse.projectDetailsForFreelancer);
                setComments(serverResponse.projectCommentGetAllForProjectDetails);
            } else {
                setProject(serverResponse.projectDetailsForFreelancer);
            }
        }
        fetchData();
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString();
    }

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newValidErrors = createCommentValidation(formData);
        setValidErrors(newValidErrors);

        console.log(newValidErrors);


        if (Object.keys(newValidErrors).length === 0) {
            try {
                const serverResponse = await createProjectComment(JSON.stringify(formData), token);

                if (serverResponse.description) {
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

    if (!project) {
        return <div><h2>Wait a moment!</h2></div>
    }

    return (
        <Container className="mt-4">
            {project && (
                <Card className="shadow-lg">
                    <CardHeader>
                        <Row>
                            <Col
                                xs={12}
                                sm={9}>

                                <h3>{project.title}</h3>
                            </Col>
                            <Col
                                style={{color: "green"}}
                                xs={12}
                                sm={3}
                                className="d-flex justify-content-sm-end ">
                                <h2>{project.budget}$</h2>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            <strong>Project Type:</strong> {project.projectType.name}
                        </CardText>
                        <CardText>
                            <strong>Subproject Type:</strong> {project.subprojectType.name}
                        </CardText>
                        <CardText>
                            <strong>Status:</strong> {project.status}
                        </CardText>
                        <CardText>
                            <strong>Description:</strong> {project.description}
                        </CardText>

                        <CardText>
                            <strong>Deadline:</strong> {formatDate(project.deadline)}
                        </CardText>

                        <CardText>
                            <strong>Created At:</strong> {formatCreatedAtDate(project.createdAt)}
                        </CardText>

                        {userType !== "EMPLOYER" &&
                            <>
                                <hr/>
                                <Row>
                                    <Col
                                        xs={12}
                                        sm={12}
                                        md={6}
                                        className="order-2 order-md-1">
                                        <Form onSubmit={handleSubmit} ref={formRef}>

                                            {error &&
                                                <div className="mt-3">
                                                    <Alert variant="danger">
                                                        {error}
                                                    </Alert>
                                                </div>
                                            }

                                            <Form.Group>
                                                <Form.Label className="mb-0">
                                                    <h5>Request to participate</h5>
                                                </Form.Label>
                                                <Form.Control as="textarea"
                                                              rows={3}
                                                              className="rounded-0"
                                                              name="commentText"
                                                              placeholder="Enter your comment"
                                                              onChange={handleChange}/>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label className="mb-0 mt-3">
                                                    <h5>Offer your price</h5>
                                                </Form.Label>
                                                <InputGroup>
                                                    <Form.Control type="text"
                                                                  className="rounded-0"
                                                                  name="proposedPrice"
                                                                  placeholder="Enter your price"
                                                                  onChange={handleChange}/>
                                                    <InputGroup.Text>$</InputGroup.Text>
                                                </InputGroup>
                                            </Form.Group>
                                            <Button
                                                className="btn-info btn-lg text-body w-100 rounded-0 mt-3"
                                                variant="info"
                                                type="submit">Submit</Button>

                                        </Form>
                                    </Col>
                                    <Col
                                        xs={12}
                                        sm={12}
                                        md={6}
                                        className="order-1 order-md-2"
                                    >
                                        <div className="text-center">
                                            <BiInfoCircle className="fs-3 mb-2"/>
                                            <p className="fw-bold mb-1">Leave a comment:</p>
                                            <p className="text-muted mb-4">Provide any additional information or
                                                questions
                                                you
                                                may have about the project.</p>

                                            <BiMoney className="fs-3 mb-2"/>
                                            <p className="fw-bold mb-1">Offer your price:</p>
                                            <p className="text-muted mb-0">Enter the amount you are willing to charge
                                                for
                                                completing the project.</p>
                                            <p className="text-muted mb-4">Make sure your offer is competitive and
                                                reflects
                                                the
                                                value of your work.</p>
                                        </div>
                                    </Col>
                                </Row>
                            </>
                        }
                    </CardBody>
                </Card>
            )}

            {comments &&
                <ProjectDetailsComment comments={comments} forEmployer={false}/>
            }

        </Container>
    );
}
export default ProjectDetails;