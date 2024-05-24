import {Button, Col, Row} from "react-bootstrap";
import {
    acceptCollaborationInvitation, declineInvitation
} from "../../../../services/collaboration-invitation-service";
import {useAuth} from "../../../../context/auth-context";
import {format} from "date-fns";
import {useTranslation} from "react-i18next";

const CollaborationInvitationMessage = ({invitation, userType, updateChat}) => {
    const {t} = useTranslation();
    const {token} = useAuth();
    const deadlineDate = new Date(invitation.deadline);
    const formattedDate = format(deadlineDate, 'dd.MM.yyyy HH:mm');
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
        <Row className="mt-3">
            <Col xs={12} className="text-center">
                <h5>{t("collaborationInvitationMessage.title")}</h5>
            </Col>
            <Col xs={12}>
                <p><strong>{t("collaborationInvitationMessage.project")}:</strong> {invitation.projectName}</p>
            </Col>
            <Col xs={12}>
                <p><strong>{t("collaborationInvitationMessage.budget")}:</strong> ${invitation.budget}</p>
            </Col>
            <Col xs={12}>
                <p><strong>{t("collaborationInvitationMessage.deadline")}:</strong> {formattedDate}</p>
            </Col>
            <Col xs={12}>
                {invitation.status === 'ACCEPTED' && (
                    <h5 style={{color: "green"}} className="text-center">{t("collaborationInvitationMessage.status.accepted")}</h5>
                )}
                {invitation.status === 'DECLINED' && (
                    <h5 style={{color: "red"}} className="text-center">{t("collaborationInvitationMessage.status.declined")}</h5>
                )}
                {invitation.status === 'UPDATED' && (
                    <h5 style={{color: "orange"}} className="text-center">{t("collaborationInvitationMessage.status.updated")}</h5>
                )}
                {invitation.status === 'COMPLETED' && (
                    <h5 style={{color: "green"}} className="text-center">{t("collaborationInvitationMessage.status.completed")}</h5>
                )}
                {userType === "FREELANCER" && invitation.status === 'PENDING' && (
                    <Row>
                        <Col xs={6}>
                            <Button variant="success"
                                    className="w-100"
                                    onClick={handleAcceptInvitation}>{t("buttons.accept")}</Button>
                        </Col>
                        <Col xs={6}>
                            <Button variant="danger"
                                    className="w-100"
                                    onClick={handleDeclineInvitation}>{t("buttons.decline")}</Button>
                        </Col>
                    </Row>
                )}
            </Col>
        </Row>
    );
};
export default CollaborationInvitationMessage;