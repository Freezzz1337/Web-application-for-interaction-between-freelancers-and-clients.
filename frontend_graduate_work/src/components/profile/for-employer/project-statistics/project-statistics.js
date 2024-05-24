import {Card, Col, Row} from "react-bootstrap";
import "./project-statistics.css";
import {BiCheck, BiFolder, BiRun} from "react-icons/bi";
import {useTranslation} from "react-i18next";
const ProjectStatistics = ({ projectStatistics }) => {
    const {t} = useTranslation();
    return (
        <Row className="text-center mt-5">
            <Col xs={4}>
                <Card className="project-statistics-card-size shadow">
                    <Card.Body>
                        <Card.Title>
                            <BiFolder className="mb-1"/> {t("projectStatistics.card1.title")}
                        </Card.Title>
                        <Card.Text className="text-muted">
                            {t("projectStatistics.card1.text")}
                        </Card.Text>
                        <Card.Text className="project-statistics-number-font">{projectStatistics.numberOfProjects}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={4}>
                <Card className="project-statistics-card-size shadow">
                    <Card.Body>
                        <Card.Title><BiRun  className="mb-1"/> {t("projectStatistics.card2.title")}</Card.Title>
                        <Card.Text className="text-muted">
                            {t("projectStatistics.card2.text")}
                        </Card.Text>
                        <Card.Text className="project-statistics-number-font">{projectStatistics.numberOfActiveProjects}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={4}>
                <Card className="project-statistics-card-size shadow">
                    <Card.Body>
                        <Card.Title> <BiCheck className="mb-1"/> {t("projectStatistics.card3.title")}</Card.Title>
                        <Card.Text className="text-muted">
                            {t("projectStatistics.card3.text")}
                        </Card.Text>
                        <Card.Text className="project-statistics-number-font">{projectStatistics.numberOfCompletedProjects}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
export default ProjectStatistics;