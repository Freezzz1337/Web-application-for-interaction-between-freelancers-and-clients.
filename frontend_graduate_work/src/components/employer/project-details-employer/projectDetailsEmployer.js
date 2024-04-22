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
import {useEffect, useState} from "react";
import {deleteProject, getProjectDetailsForEmployer} from "../../../services/project-service";

const ProjectDetailsEmployer = () => {
    const {token} = useAuth();
    const {projectId} = useParams();
    const [project, setProject] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {

            const serverResponse = await getProjectDetailsForEmployer(projectId, token);
            if (serverResponse) {
                setProject(serverResponse);
            }
        }
        fetchData();
    }, []);


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
                            <strong>Freelancer:</strong> {project.freelancer ? project.freelancer.name : 'No freelancer assigned'}
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
        </Container>
    );
}
export default ProjectDetailsEmployer;


