import {Button} from "react-bootstrap";
import {
    acceptCollaborationInvitation,
    createCollaborationInvitation, declineCollaborationInvitation
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
            {invitation.accepted ? (
                <h5 style={{color:"green"}}>Invitation accepted!</h5>
            ) : invitation.declined ? (
                <h5 style={{color:"red"}}>Invitation declined!</h5>
            ) : userType === "FREELANCER" && !invitation.accepted && !invitation.declined && (
                <>
                    <Button onClick={handleAcceptInvitation}>Accept</Button>
                    <Button onClick={handleDeclineInvitation}>Decline</Button>
                </>
            )}
        </div>
    );
};
export default CollaborationInvitationMessage;