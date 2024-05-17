import {useNavigate, useParams} from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardText, Col,
    Container, Row
} from "react-bootstrap";
import {useAuth} from "../../../context/auth-context";
import React, {useEffect, useState} from "react";
import {deleteProject, getProjectDetailsForEmployer} from "../../../services/project-service";
import ProjectDetailsComment from "../../project-details-comment";
import ModalProjectDetails from "./modal-project-details/modal-project-details";

const ProjectDetailsEmployer = () => {
    const {token} = useAuth();
    const {projectId} = useParams();
    const [project, setProject] = useState(null);
    const [comments, setComments] = useState(null);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const [selectedFreelancer, setSelectedFreelancer] = useState(null);


    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenModal = (freelancerId) => {
        setSelectedFreelancer(freelancerId);
        setShowModal(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const updateProjectDetailsEmployer = () => {
        fetchData();
    }

    const fetchData = async () => {
        const serverResponse = await getProjectDetailsForEmployer(projectId, token);
        console.log(serverResponse);
        if (serverResponse?.projectCommentGetAllForProjectDetails?.length > 0) {
            setProject(serverResponse.projectDetailsForEmployer);
            setComments(serverResponse.projectCommentGetAllForProjectDetails);
        } else {
            setProject(serverResponse.projectDetailsForEmployer);
        }
    }

    const handleEditProject = () => {
        navigate(`/project/edit/${project.id}`);
    };

    const handleDeleteProject = async (e) => {
        e.preventDefault();
        await deleteProject(projectId, token);

        navigate(`/projects`);
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString();
    }


    if (!project) {
        return <div><h2>Wait a moment!</h2></div>
    }


    return (
        <Container className="mt-4">
            {project && (
                <Card className="shadow-lg">
                    <CardHeader>
                        <h5>{project.title}</h5>
                        <hr className="my-2"/>
                        <small>Project ID: {project.id}</small>
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            <strong>Project Type:</strong> {project.projectType.name}
                        </CardText>
                        <CardText>
                            <strong>Subproject Type:</strong> {project.subprojectType.name}
                        </CardText>
                        <CardText>
                            <strong>Description:</strong> {project.description}
                        </CardText>
                        <CardText>
                            <strong>Budget:</strong> {project.budget}
                        </CardText>
                        <CardText>
                            <strong>Deadline:</strong> {formatDate(project.deadline)}
                        </CardText>
                        <CardText>
                            <strong>Freelancer:</strong> {project.freelancer ? project.freelancer.fullName : 'No freelancer assigned'}
                        </CardText>
                        <CardText>
                            <strong>Status:</strong> {project.status}
                        </CardText>
                        <CardText>
                            <strong>Created At:</strong> {formatDate(project.createdAt)}
                        </CardText>
                        <CardText>
                            <strong>Updated At:</strong> {formatDate(project.updatedAt)}
                        </CardText>

                        <Row>
                            <hr/>

                            <Col lg={6} xs={12}>
                                <Button onClick={handleEditProject}
                                        className="btn btn-info btn-lg text-body w-100 rounded-0 mt-1">Edit
                                    Project</Button>
                            </Col>
                            <Col lg={6} xs={12}>
                                <Button onClick={handleDeleteProject} variant="info"
                                        className="btn btn-info btn-lg text-body w-100 rounded-0 mt-1">Delete</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            )}

            {comments &&
                <>
                    <ProjectDetailsComment comments={comments}
                                           forEmployer={true}
                                           handleOpenModal={handleOpenModal}
                    />

                    <ModalProjectDetails show={showModal}
                                         handleClose={handleCloseModal}
                                         freelancerId={selectedFreelancer}
                                         projectId={project.id}
                                         updateProjectDetailsEmployer={updateProjectDetailsEmployer}
                    />
                </>
            }
        </Container>
    );
}
export default ProjectDetailsEmployer;


