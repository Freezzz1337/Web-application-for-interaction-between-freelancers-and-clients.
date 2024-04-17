import {useNavigate, useParams} from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardText,
    Container
} from "react-bootstrap";
import {useAuth} from "../../../context/auth-context";
import {useEffect, useState} from "react";
import {getProjectDetailsForEmployer} from "../../../services/project-service";

const ProjectDetailsEmployer = () => {
    const {token} = useAuth();
    const {projectId} = useParams();
    const [project, setProject] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            console.log("!!!!!!!!!!!!!!!! " );

            const serverResponse = await getProjectDetailsForEmployer(projectId, token);
            if (serverResponse) {
                setProject(serverResponse);
            }
            console.log(project);
        }
        fetchData();
    }, []);

    const handleEditProject = () => {
        navigate(`/project/edit/${project.id}`, {state: {project} });
    };

    if (!project) {
        return <div><h2>Wait a moment!</h2></div>
    }


    return (
        <Container className="mt-4">
            {project && (
                <Card className="shadow-lg" >
                    <CardHeader>
                        <h5>{project.title}</h5>
                        <hr className="my-2" />
                        <small>Project ID: {project.id}</small>
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            <strong>Description:</strong> {project.description}
                        </CardText>
                        <CardText>
                            <strong>Budget:</strong> {project.budget}
                        </CardText>
                        <CardText>
                            <strong>Deadline:</strong> {project.deadline}
                        </CardText>
                        <CardText>
                            <strong>Freelancer:</strong> {project.freelancer ? project.freelancer.name : 'No freelancer assigned'}
                        </CardText>
                        <CardText>
                            <strong>Status:</strong> {project.status}
                        </CardText>
                        <CardText>
                            <strong>Created At:</strong> {project.createdAt}
                        </CardText>
                        <CardText>
                            <strong>Updated At:</strong> {project.updatedAt}
                        </CardText>
                        <Button  onClick={handleEditProject} className="btn btn-info btn-lg text-body w-100 rounded-0 mt-3">Edit Project</Button>
                    </CardBody>
                </Card>
            )}
        </Container>
    );
}
export default ProjectDetailsEmployer;


