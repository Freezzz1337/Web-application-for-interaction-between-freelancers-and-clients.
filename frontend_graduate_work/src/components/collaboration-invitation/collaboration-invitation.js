import {Button, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useAuth} from "../../context/auth-context";
import {convertToDateTimeLocal} from "../../util/convert-to-date-time-local";
import {
    createCollaborationInvitation, declineCollaborationInvitation,
    editCollaborationInvitation, getCollaborationInvitation
} from "../../services/collaboration-invitation-service";
import CollaborationInvitationReview from "../collaboration-invitation-review";

const CollaborationInvitation = ({showModal, toggleModal, userId, projectId, collaborationAction, updateChat}) => {
    const {token} = useAuth();
    const [projectName, setProjectName] = useState(null);

    const [showReviewModal, setShowReviewModal] = useState(false);

    const [formData, setFormData] = useState({
        newBudget: '',
        newDeadline: '',
        projectId: projectId,
        freelancerId: userId
    });

    useEffect(() => {
        const fetchProject = async () => {
            const serverResponse = await getCollaborationInvitation(projectId, userId, token);
            setProjectName(serverResponse.title);

            setFormData({
                ...formData,
                newBudget: serverResponse.budget,
                newDeadline: serverResponse.deadline
            });
        };
        fetchProject();
    }, [projectId, token]);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleApprove = async () => {
        if (collaborationAction === "decline") {
            await declineCollaborationInvitation(JSON.stringify({
                projectId: formData.projectId,
                freelancerId: formData.freelancerId
            }), token);

            updateChat();
            toggleModal();
        }
        else {
            setShowReviewModal(true);
        }
    };

    const handleDecline = async (e) => {
        e.preventDefault();
        toggleModal();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let serverResponse;
        if (collaborationAction === "collaborate") {
            serverResponse = await createCollaborationInvitation(JSON.stringify(formData), token);
        } else if (collaborationAction === "edit") {
            serverResponse = await editCollaborationInvitation(JSON.stringify(formData), token);
        }
        if (serverResponse) {
            updateChat();
            toggleModal();
        }
    };

    if (!formData.newBudget && !projectName) {
        return <div><h2>Wait a moment!</h2></div>
    }

    return (
        <>
            <Modal show={showModal} onHide={toggleModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {collaborationAction === "collaborate" ? "Collaboration Agreement" :
                            collaborationAction === "approve" ? "Approve Collaboration Agreement" :
                                collaborationAction === "decline" ? "Decline Collaboration Agreement" :
                                    "Edit Collaboration Agreement"
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="text-center mb-1">{projectName}</h6>
                    {(collaborationAction === "collaborate" || collaborationAction === "edit") && (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="newBudget">
                                <Form.Label className="mb-0 mt-3">Budget</Form.Label>
                                <Form.Control type="text" name="newBudget" value={formData.newBudget}
                                              onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="newDeadline">
                                <Form.Label className="mb-0 mt-3">Deadline</Form.Label>
                                <Form.Control type="datetime-local" name="newDeadline"
                                              value={convertToDateTimeLocal(formData.newDeadline)}
                                              onChange={handleChange}/>
                            </Form.Group>
                            <Button variant="success" type="submit"
                                    className="btn-lg w-100 rounded-0 mt-3">Confirm</Button>
                        </Form>
                    )}
                    {(collaborationAction === "approve" || collaborationAction === "decline") && (
                        <>
                            <p>Are you sure you want to {collaborationAction === "approve" ? "approve" : "decline"} the
                                collaboration invitation for "{projectName}"?</p>
                            <Button variant="success" className="btn-lg w-100 rounded-0 mt-3"
                                    onClick={handleApprove}>Confirm</Button>
                            <Button variant="danger" className="btn-lg w-100 rounded-0 mt-3"
                                    onClick={handleDecline}>Cancel</Button>
                        </>
                    )}
                </Modal.Body>
            </Modal>

            <CollaborationInvitationReview
                showReviewModal={showReviewModal}
                setShowReviewModal={setShowReviewModal}
                projectId={formData.projectId}
                freelancerId={formData.freelancerId}
                toggleMainModal={toggleModal}
                updateChat={updateChat}
                token={token}
            />
        </>
    );
};

export default CollaborationInvitation;