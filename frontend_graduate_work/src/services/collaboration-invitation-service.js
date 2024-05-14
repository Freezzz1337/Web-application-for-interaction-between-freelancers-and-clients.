import {_api, _requestOptionsPOST, _requestOptionsWithoutBodyPATCH} from "./apiRequestHelpers";

const createCollaborationInvitation = async (formData, token) => {
    return await fetch(`${_api}collaborationInvitation/create`, _requestOptionsPOST(formData, token))
        .then(response => response.json());
}

const acceptCollaborationInvitation = async (invitationId, token) => {
    return await fetch(`${_api}collaborationInvitation/accept/${invitationId}`, _requestOptionsWithoutBodyPATCH(token))
        .then(response => response.json());
}

const declineCollaborationInvitation = async (invitationId, token) => {
    return await fetch(`${_api}collaborationInvitation/decline/${invitationId}`, _requestOptionsWithoutBodyPATCH(token))
        .then(response => response.json());
}
export {
    createCollaborationInvitation,
    acceptCollaborationInvitation,
    declineCollaborationInvitation
}