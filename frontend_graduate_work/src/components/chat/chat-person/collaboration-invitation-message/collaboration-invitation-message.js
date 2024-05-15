import {Button} from "react-bootstrap";
import {
    acceptCollaborationInvitation, declineCollaborationInvitation
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

        const serverResponse = await declineCollaborationInvitation(invitation.id, token);
        if (serverResponse) {
            updateChat();
        }
    }

    return (
        <div>
            <p>Collaboration Invitation:</p>
            <p>Project: {invitation.projectName}</p>
            <p>Budget: ${invitation.budget}</p>
            {invitation.status === 'ACCEPTED' ? (
                <h5 style={{color: "green"}}>{invitation.status}</h5>
            ) : invitation.status === 'DECLINED' ? (
                <h5 style={{color: "red"}}>Invitation declined!</h5>
            ) : invitation.status === 'UPDATED' ? (
                    <h5 style={{color: "orange"}}>Invitation updated!</h5>
                )
                : userType === "FREELANCER" && invitation.status === 'PENDING' && (
                <>
                    <Button onClick={handleAcceptInvitation}>Accept</Button>
                    <Button onClick={handleDeclineInvitation}>Decline</Button>
                </>
            )}
        </div>
    );
};
export default CollaborationInvitationMessage;