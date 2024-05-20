import {Card, Col, Row} from "react-bootstrap";
import StarRating from "../../star-rating";
import formatCreatedAtDate from "../../../util/format-created-at-date";
import "./for-freelancer.css";

const Reviews = ({reviews}) => {
    return (
        <div className="mt-5">
            <h2 className="mt-2">Reviews</h2>
            <hr/>
            {reviews.map((review, index) => (
                <Card key={index} className="mb-3 shadow-lg " >
                    <Card.Body>
                        <Row>
                            <Col md={8}>
                                <strong style={{fontSize:"20px"}}> {review.projectName}</strong>
                                <span> {formatCreatedAtDate(review.reviewDate)}</span>

                                <p className="mt-3 mb-2"><strong>Employer:</strong> {review.employerName}</p>
                                <p><strong>Budget:</strong> ${review.budget}</p>
                                <p>{review.comment}</p>
                            </Col>
                            <Col md={4} className="d-flex align-items-center justify-content-center">
                                <div className="text-center">
                                    <p><strong>Rating:</strong></p>
                                    <StarRating rating={review.rating} readonly={true}/>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default Reviews;