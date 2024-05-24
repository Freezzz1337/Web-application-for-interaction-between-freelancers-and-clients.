import {Button, Card, Col, Row} from "react-bootstrap";
import "./project-details-comment.css";
import formatCreatedAtDate from "../../util/format-created-at-date";
import {useTranslation} from "react-i18next";

const ProjectDetailsComment = ({ comments, forEmployer, handleOpenModal, handleOpenChat, freelancerCollaborated }) => {
    const {t} = useTranslation();
    return (
        <div className="mt-5">
            <h3>{comments.length} {t("projectDetailsComment.title")}</h3>
            <hr/>

            {comments.map((comment, index) => {
                const isActive = freelancerCollaborated === null || (freelancerCollaborated && freelancerCollaborated.id === comment.userId);
                return (
                    <Card key={index} className="mb-3">
                        <Card.Body>
                            <Row>
                                <Col xs={2}>
                                    <div>
                                        <img src={`data:image/jpeg;base64,${comment.profilePicture}`} alt="Profile"
                                             className="square-image"/>
                                    </div>
                                </Col>
                                <Col xs={10}>
                                    <div>
                                        <div className="title-wrapper mb-3">
                                            {comment.userName}
                                            <span> {formatCreatedAtDate(comment.createdAt)}</span>
                                        </div>

                                        <h6 style={{color: "green"}}>{t("projectDetailsComment.titleBudget")} {comment.budget}$</h6>
                                        <div>{comment.commentText}</div>
                                    </div>
                                </Col>

                                {forEmployer && (
                                    <Col>
                                        {comment.firstMessage ? (
                                            <>
                                                <hr className="mb-0"/>
                                                <div
                                                    onClick={() => isActive && handleOpenChat(comment.userId, comment.userName)}
                                                    className={`project-details-comment-clickable ${!isActive ? 'inactive' : ''}`}
                                                    style={{ cursor: !isActive ? 'not-allowed' : 'pointer' }}>
                                                    <h4 className="text-center">{t("projectDetailsComment.titleCreated")}</h4>
                                                </div>
                                            </>
                                        ) : (
                                            <Button
                                                onClick={() => isActive && handleOpenModal(comment.userId)}
                                                className="btn-info btn-lg text-body w-100 rounded-0 mt-3"
                                                disabled={!isActive}>
                                                {t("buttons.getInTouch")}
                                            </Button>
                                        )}
                                    </Col>
                                )}
                            </Row>
                        </Card.Body>
                    </Card>
                );
            })}
        </div>
    );
};

export default ProjectDetailsComment;