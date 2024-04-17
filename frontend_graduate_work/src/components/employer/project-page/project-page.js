import {Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAllProjectsForEmployer} from "../../../services/project-service";
import {useAuth} from "../../../context/auth-context";

const ProjectPage = () => {
    const {token} = useAuth();
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const serverResponse = await getAllProjectsForEmployer(token);
            if (serverResponse) {
                setProjects(serverResponse);
            }
        }
        fetchData();
    }, []);

    if (!projects) {
        return <div><h2>Wait a moment!</h2></div>
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col className="text-center">
                    <Link className="btn btn-info btn-lg text-body w-100 rounded-0" to="/project/create" block>Create
                        new project</Link>
                </Col>
            </Row>
            <hr/>
            <h2>My projects</h2>
            <Row className="mt-3">
                {projects.map(project => (
                    <Col key={project.id} md={4} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{project.title}</Card.Title>
                                <Card.Text>
                                    Status: {project.status}
                                </Card.Text>

                                <Link to={`/project/details/${project.id}`}
                                      className="btn btn-info"
                                      align="center">
                                    More details
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
export default ProjectPage;