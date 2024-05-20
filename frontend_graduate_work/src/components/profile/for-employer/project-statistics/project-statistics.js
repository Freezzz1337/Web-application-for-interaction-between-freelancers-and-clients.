import {Card, Col, Row} from "react-bootstrap";
import "./project-statistics.css";
import {BiCheck, BiFolder, BiRun} from "react-icons/bi";
const ProjectStatistics = ({ projectStatistics }) => {
    return (
        <Row className="text-center mt-5">
            <Col xs={4}>
                <Card className="project-statistics-card-size shadow">
                    <Card.Body>
                        <Card.Title>
                            <BiFolder className="mb-1"/> Total Projects
                        </Card.Title>
                        <Card.Text className="text-muted">
                            Total number of projects created by the user.
                            This includes all projects that have been initiated by the user,
                            regardless of their current status.
                        </Card.Text>
                        <Card.Text className="project-statistics-number-font">{projectStatistics.numberOfProjects}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={4}>
                <Card className="project-statistics-card-size shadow">
                    <Card.Body>
                        <Card.Title><BiRun  className="mb-1"/> Active Projects</Card.Title>
                        <Card.Text className="text-muted">
                            Number of projects that are currently active and in progress.
                            These projects are actively being worked on by the user or others involved.
                        </Card.Text>
                        <Card.Text className="project-statistics-number-font">{projectStatistics.numberOfActiveProjects}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={4}>
                <Card className="project-statistics-card-size shadow">
                    <Card.Body>
                        <Card.Title> <BiCheck className="mb-1"/> Completed Projects</Card.Title>
                        <Card.Text className="text-muted">
                            Number of projects that have been successfully completed.
                            These projects have reached their conclusion and fulfilled their objectives.
                        </Card.Text>
                        <Card.Text className="project-statistics-number-font">{projectStatistics.numberOfCompletedProjects}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
export default ProjectStatistics;