import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {getStatusProjectText} from "../../../../util/get-status-project-text";
import {useTranslation} from "react-i18next";

const ProjectList = ({projects}) => {
    const {t} = useTranslation();

    if (!projects || projects.length === 0) {
        return <div className="text-center mt-5"><h2>{t("projectList.emptyList")}</h2></div>;
    }

    return (
        <Row className="mt-3">
            {projects.map(project => (
                <Col key={project.id} md={6} xl={4} className="mb-3">
                    <Card className="card-container">
                        <Card.Body>
                            <Card.Title className="text-center">{project.title}</Card.Title>
                            <Row className="text-center mt-3">
                                <Col xs={6}>
                                    <Card.Text>
                                        {t("projectList.status")}: {getStatusProjectText(project.status)}
                                    </Card.Text>
                                </Col>
                                <Col xs={6}>
                                    <Card.Text>
                                        {t("projectList.comments")}: {project.amountOfComments}
                                    </Card.Text>
                                </Col>
                            </Row>
                            <div className="text-center mt-3 ">
                                <Link to={`/project/details/employer/${project.id}`}
                                      className="btn btn-outline-info rounded-5 shadow">
                                    {t("buttons.moreDetails")}
                                </Link>
                            </div>

                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}
export default ProjectList;