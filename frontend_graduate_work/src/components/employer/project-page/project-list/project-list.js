import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {getStatusProjectText} from "../../../../util/get-status-project-text";

const ProjectList = ({ projects }) => {

    if (!projects || projects.length === 0) {
        return <div className="text-center mt-5"><h2>This list is still empty</h2></div>;
    }

    return (
        <Row className="mt-3">
            {projects.map(project => (
                <Col key={project.id} md={4} className="mb-3">
                    <Card className="card-container">
                        <Card.Body>
                            <Card.Title className="card-title">{project.title}</Card.Title>
                            <Card.Text className="mb-0">
                                Status: {getStatusProjectText(project.status)}
                            </Card.Text>
                            <Card.Text className="mt-0">
                                Comments: {project.amountOfComments}
                            </Card.Text>
                            <Link to={`/project/details/employer/${project.id}`}
                                  className="btn btn-info"
                                  align="center">
                                More details
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}
export default ProjectList;