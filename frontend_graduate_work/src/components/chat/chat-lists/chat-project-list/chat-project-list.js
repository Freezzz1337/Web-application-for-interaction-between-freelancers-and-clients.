import {Col, Row} from "react-bootstrap";
import "./chat-project-list.css"

const ChatProjectList = ({ projects, handleProject }    ) => {

    return (

            <Row className="for-container">
                {projects &&
                    projects.map((project) => (
                        <Col xs={12} key={project.projectId} className="project-col" onClick={() => handleProject(project.projectId)}>
                            <div className="project-title">
                                <strong>{project.projectName}</strong>
                                <p className="mt-2">Status: {project.status}</p>
                            </div>
                            <hr />
                        </Col>
                    ))}
            </Row>

    );
}
export default ChatProjectList;
