import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import StarRating from "../star-rating";
import {completedCollaborationInvitation} from "../../services/collaboration-invitation-service";

const CollaborationInvitationReview = ({
                                           showReviewModal,
                                           setShowReviewModal,
                                           projectId,
                                           freelancerId,
                                           toggleMainModal,
                                           updateChat,
                                           token
                                       }) => {

    const [formData, setFormData] = useState({
        projectId: projectId,
        freelancerId: freelancerId,
        review: {
            comment: "",
            rating: 0
        }
    });

    const handleReviewChange = (e) => {
        const {name, value} = e.target;

        setFormData(prevState => ({
            ...prevState,
            review: {
                ...prevState.review,
                [name]: value
            }
        }));
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        const serverResponse = await completedCollaborationInvitation(JSON.stringify(formData), token);
        if (serverResponse) {
            setShowReviewModal(false);
            toggleMainModal();
            updateChat();
        }
    };

    const handleRatingChange = (rating) => {
        handleReviewChange({target: {name: 'rating', value: rating}});
    };

    return (
        <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Leave a Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="rating">
                        <Form.Label>Rating:</Form.Label>
                        <StarRating rating={formData.review.rating} onRatingChange={handleRatingChange}/>
                    </Form.Group>
                    <Form.Group controlId="comment">
                        <Form.Label>Comment:</Form.Label>
                        <Form.Control as="textarea" rows={3} value={formData.review.comment} name="comment"
                                      onChange={handleReviewChange}/>
                    </Form.Group>
                    <Button variant="success"
                            className="btn-lg w-100 rounded-0 mt-3"
                            onClick={handleSubmitReview}>
                        Submit Review
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default CollaborationInvitationReview;