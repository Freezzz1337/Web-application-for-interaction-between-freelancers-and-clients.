import {Card, Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import "./project-page.css";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    getAllCompletedProjectsForEmployer,
    getAllInProgressProjectsForEmployer,
    getAllOpenProjectsForEmployer,
    getAllProjectsForEmployer
} from "../../../services/project-service";
import {useAuth} from "../../../context/auth-context";
import ProjectList from "./project-list";
import {FaCheckCircle, FaFolderOpen, FaList, FaSpinner} from "react-icons/fa";
import Spinner from "../../spinner";

const ProjectPage = () => {
    const {token} = useAuth();
    const [projects, setProjects] = useState(null);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            let serverResponse;
            switch (activeTab) {
                case 'all':
                    serverResponse = await getAllProjectsForEmployer(token);
                    break;
                case 'open':
                    serverResponse = await getAllOpenProjectsForEmployer(token);
                    break;
                case 'in-progress':
                    serverResponse = await getAllInProgressProjectsForEmployer(token);
                    break;
                case 'completed':
                    serverResponse = await getAllCompletedProjectsForEmployer(token);
                    break;
                default:
                    serverResponse = await getAllProjectsForEmployer(token);
            }

            if (serverResponse) {
                setProjects(serverResponse);
            }
        };

        fetchData();
    }, [activeTab, token]);

    if (!projects) {
        return (
            <div style={{height: "100%"}} className="d-flex justify-content-center align-items-center">
                <Spinner size="10rem"/>
            </div>
        );
    }

    return (
        <Container >
            <Row className="justify-content-center">
                <Col className="text-center mt-5 mb-5">
                    <Link className="btn btn-info btn-lg text-body w-100 rounded-0" to="/project/create">
                        Create new project
                    </Link>
                </Col>
            </Row>
            <hr className="mt-0"/>
            <h2 className="text-center">My projects</h2>

            <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
                <Tab eventKey="all" title={<span><FaList className="me-2"/> All</span>}>
                    <ProjectList projects={projects}/>
                </Tab>
                <Tab eventKey="open" title={<span><FaFolderOpen className="me-2"/> Open</span>}>
                    <ProjectList projects={projects}/>
                </Tab>
                <Tab eventKey="in-progress" title={<span><FaSpinner className="me-2"/> In Progress</span>}>
                    <ProjectList projects={projects}/>
                </Tab>
                <Tab eventKey="completed" title={<span><FaCheckCircle className="me-2"/> Completed</span>}>
                    <ProjectList projects={projects}/>
                </Tab>
            </Tabs>
        </Container>
    );
}

export default ProjectPage;