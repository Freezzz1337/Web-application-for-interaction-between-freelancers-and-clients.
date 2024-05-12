import {Col, Row} from "react-bootstrap";
import "./chat-project-list.css"

const ChatProjectList = ({projects, handleProject}) => {

    return (
        <Row className="chat-project-list-for-container">
            {projects &&
                projects.map((project) => (
                    <Col xs={12} key={project.projectId}
                         className="project-col  align-items-center"
                         onClick={() => handleProject(project.projectId, project.projectName)}>

                        <div className="project-title mt-3">
                            <strong>{project.projectName}</strong>
                            <p className="mt-2">Status: {project.status}</p>
                        </div>
                        <hr className="mb-0"/>
                    </Col>
                ))}
        </Row>
    );
}
export default ChatProjectList;
