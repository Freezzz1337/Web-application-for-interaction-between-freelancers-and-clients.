import {Button, Card, Col, Row} from "react-bootstrap";
import "./project-details-comment.css";
import formatCreatedAtDate from "../../util/format-created-at-date";

const ProjectDetailsComment = ({comments, forEmployer, handleOpenModal}) => {

    if (forEmployer) {
    }

    return (
        <div className="mt-5">
            <h3>{comments.length} freelancers left comments:</h3>
            <hr/>

            {comments.map((comment, index) => (
                <Card key={index} style={{marginBottom: '10px'}}>
                    <Card.Body>
                        <Row>
                            <Col
                                xs={2}>
                                <div>
                                    <img src={`data:image/jpeg;base64,${comment.profilePicture}`} alt="Profile"
                                         className="square-image"/>
                                </div>
                            </Col>
                            <Col
                                xs={10}>
                                <div>
                                    <div className="title-wrapper mb-3">
                                        {comment.userName}
                                        <span> {formatCreatedAtDate(comment.createdAt)}</span>
                                    </div>

                                    <h6 style={{color: "green"}}>Offered Price: {comment.budget}$</h6>
                                    <div>{comment.commentText}</div>

                                </div>
                            </Col>

                            {forEmployer &&
                                <Col>
                                    <Button
                                        onClick={() => handleOpenModal(comment.userId)}
                                        className="btn-info btn-lg text-body w-100 rounded-0 mt-3">Get in
                                        touch</Button>
                                </Col>
                            }
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default ProjectDetailsComment
