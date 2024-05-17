import {Button, Col, Row} from "react-bootstrap";
import {
    acceptCollaborationInvitation, declineInvitation
} from "../../../../services/collaboration-invitation-service";
import {useAuth} from "../../../../context/auth-context";

const CollaborationInvitationMessage = ({invitation, userType, updateChat}) => {
    const {token} = useAuth();
    const handleAcceptInvitation = async (e) => {
        e.preventDefault();

        const serverResponse = await acceptCollaborationInvitation(invitation.id, token);
        if (serverResponse) {
            updateChat();
        }
    }

    const handleDeclineInvitation = async (e) => {
        e.preventDefault();
        const serverResponse = await declineInvitation(invitation.id, token);
        if (serverResponse) {
            updateChat();
        }
    }

    return (
        <Row>
            <Col xs={12} className="text-center">
                <h5>Collaboration Invitation</h5>
            </Col>
            <Col xs={12} >
                <p><strong>Project:</strong> {invitation.projectName}</p>
            </Col>
            <Col xs={12} >
                <p><strong>Budget:</strong> ${invitation.budget}</p>
            </Col>
            <Col xs={12} >
                {invitation.status === 'ACCEPTED' && (
                    <h5 style={{ color: "green" }} className="text-center">Invitation accepted!</h5>
                )}
                {invitation.status === 'DECLINED' && (
                    <h5 style={{ color: "red" }} className="text-center">Invitation declined!</h5>
                )}
                {invitation.status === 'UPDATED' && (
                    <h5 style={{ color: "orange" }} className="text-center">Invitation updated!</h5>
                )}
                {invitation.status === 'COMPLETED' && (
                    <h5 style={{ color: "green" }} className="text-center">Invitation completed!</h5>
                )}
                {userType === "FREELANCER" && invitation.status === 'PENDING' && (
                    <Row>
                        <Col xs={6}>
                            <Button variant="success"
                                    className="w-100"
                                    onClick={handleAcceptInvitation}>Accept</Button>
                        </Col>
                        <Col xs={6}>
                            <Button variant="danger"
                                    className="w-100"
                                    onClick={handleDeclineInvitation}>Decline</Button>
                        </Col>
                    </Row>
                )}
            </Col>
        </Row>
    );
};
export default CollaborationInvitationMessage;