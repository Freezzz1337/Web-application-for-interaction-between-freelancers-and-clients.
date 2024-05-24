import {useNavigate, useParams} from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardText, Col,
    Container, Modal, Row
} from "react-bootstrap";
import {useAuth} from "../../../context/auth-context";
import React, {useEffect, useState} from "react";
import {deleteProject, getProjectDetailsForEmployer} from "../../../services/project-service";
import ProjectDetailsComment from "../../project-details-comment";
import ModalProjectDetails from "./modal-project-details/modal-project-details";
import Chat from "../../chat";
import "./project-details-employer.css";
import Spinner from "../../spinner";
import {useTranslation} from "react-i18next";

const ProjectDetailsEmployer = () => {
    const {t} = useTranslation();
    const {token} = useAuth();
    const {projectId} = useParams();
    const [project, setProject] = useState(null);
    const [comments, setComments] = useState(null);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [showChat, setShowChat] = useState(false);

    const [selectedFreelancer, setSelectedFreelancer] = useState(null);

    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUserName, setSelectedUserName] = useState(null);

    const [freelancerCollaborated, setFreelancerCollaborated] = useState(null);

    const [showModalDelete, setShowModalDelete] = useState(false);

    const handleCloseModalDelete = () => {
        setShowModalDelete(false);
    }
    const handleOpenModalDelete = () => {
        setShowModalDelete(true);
    }

    const handleDeleteProject = async (e) => {
        e.preventDefault();
        await deleteProject(projectId, token);
        navigate(`/projects`);
        handleCloseModalDelete();
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenModal = (freelancerId) => {
        setSelectedFreelancer(freelancerId);
        setShowModal(true);
    };

    const handleOpenChat = (userId, userName) => {
        setSelectedUserId(userId);
        setSelectedUserName(userName);
        setShowChat(true);
    };

    const handleCloseChat = () => {
        setShowChat(false);
        setSelectedUserId(null);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const updateProjectDetailsEmployer = () => {
        fetchData();
    }

    const fetchData = async () => {
        const serverResponse = await getProjectDetailsForEmployer(projectId, token);
        if (serverResponse?.projectCommentGetAllForProjectDetails?.length > 0) {
            setProject(serverResponse.projectDetailsForEmployer);
            setComments(serverResponse.projectCommentGetAllForProjectDetails);
            setFreelancerCollaborated(serverResponse.projectDetailsForEmployer.freelancer)
        } else {
            setProject(serverResponse.projectDetailsForEmployer);
        }
    }

    const handleEditProject = () => {
        navigate(`/project/edit/${project.id}`);
    };


    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString();
    }

    if (!project) {
        return (
            <div style={{height: "100%"}} className="d-flex justify-content-center align-items-center">
                <Spinner size="10rem"/>
            </div>
        );
    }

    return (
        <Container className="mt-4">
            {project && (
                <Card className="shadow-lg">
                    <CardHeader>
                        <h5>{project.title}</h5>
                        <hr className="my-2"/>
                        <small>{t("projectDetailsEmployer.header")}: {project.id}</small>
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            <strong>{t("projectFields.projectType")}:</strong> {project.projectType.name}
                        </CardText>
                        <CardText>
                            <strong>{t("projectFields.subprojectType")}:</strong> {project.subprojectType.name}
                        </CardText>
                        <CardText>
                            <strong>{t("projectFields.description")}:</strong> {project.description}
                        </CardText>
                        <CardText>
                            <strong>{t("projectFields.budget")}:</strong> {project.budget}
                        </CardText>
                        <CardText>
                            <strong>{t("projectFields.deadline")}:</strong> {formatDate(project.deadline)}
                        </CardText>
                        <CardText>
                            <strong>{t("projectDetailsEmployer.freelancer")}:</strong> {project.freelancer ? (
                            <span
                                onClick={() => handleOpenChat(project.freelancer.id, project.freelancer.fullName)}
                                className="freelancer-info"
                            >
                                    {project.freelancer.fullName}
                                </span>
                        ) : (
                            `${t("projectDetailsEmployer.noFreelancer")}`
                        )}
                        </CardText>
                        <CardText>
                            <strong>{t("projectDetailsEmployer.status")}:</strong> {project.status}
                        </CardText>
                        <CardText>
                            <strong>{t("projectDetailsEmployer.createdAt")}:</strong> {formatDate(project.createdAt)}
                        </CardText>
                        <CardText>
                            <strong>{t("projectDetailsEmployer.updatedAt")}:</strong> {formatDate(project.updatedAt)}
                        </CardText>

                        <Row>
                            <hr/>
                            <Col lg={6} xs={12}>
                                <Button onClick={handleEditProject}
                                        className="btn btn-info btn-lg text-body w-100 rounded-0 mt-1">{t("buttons.editProject")}</Button>
                            </Col>
                            <Col lg={6} xs={12}>
                                <Button onClick={handleOpenModalDelete} variant="info"
                                        className="btn btn-info btn-lg text-body w-100 rounded-0 mt-1">{t("buttons.delete")}</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            )}

            <Modal show={showModalDelete} onHide={handleCloseModalDelete} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t("deleteModal.title")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="danger"
                            className="w-50 btn-lg rounded-5"
                            onClick={handleDeleteProject}>{t("buttons.delete")}</Button>
                    <Button variant="secondary"
                            className="w-50 btn-lg rounded-5"
                            onClick={handleCloseModalDelete}>{t("buttons.cancel")}</Button>
                </Modal.Body>
            </Modal>

            {comments && (
                <>

                    <ProjectDetailsComment comments={comments}
                                           forEmployer={true}
                                           handleOpenModal={handleOpenModal}
                                           handleOpenChat={handleOpenChat}
                                           freelancerCollaborated={freelancerCollaborated}
                    />

                    <ModalProjectDetails show={showModal}
                                         handleClose={handleCloseModal}
                                         freelancerId={selectedFreelancer}
                                         projectId={project.id}
                                         updateProjectDetailsEmployer={updateProjectDetailsEmployer}
                    />

                    <Chat show={showChat}
                          onHide={handleCloseChat}
                          userId={selectedUserId}
                          userName={selectedUserName}
                          projectId={project.id}
                          projectName={project.title}
                    />
                </>
            )}
        </Container>
    )
};

export default ProjectDetailsEmployer;