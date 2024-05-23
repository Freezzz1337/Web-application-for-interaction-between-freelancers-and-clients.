import {
    _api,
    _requestOptionsGET,
    _requestOptionsPATCH,
    _requestOptionsPOST,
    _requestOptionsWithoutBodyPATCH
} from "./apiRequestHelpers";

const createCollaborationInvitation = async (formData, token) => {
    return await fetch(`${_api}collaborationInvitation/create`, _requestOptionsPOST(formData, token))
        .then(response => response.json());
}

const acceptCollaborationInvitation = async (invitationId, token) => {
    return await fetch(`${_api}collaborationInvitation/accept/${invitationId}`, _requestOptionsWithoutBodyPATCH(token))
        .then(response => response.json());
}

const declineCollaborationInvitation = async (formData, token) => {
    return await fetch(`${_api}collaborationInvitation/decline`, _requestOptionsPATCH(formData,token))
        .then(response => response.json());
}

const editCollaborationInvitation = async (formData, token) => {
    return await fetch(`${_api}collaborationInvitation/edit`, _requestOptionsPATCH(formData, token))
        .then(response => response.json());
}

const getCollaborationInvitation = async (projectId, userId, token) => {
    return await fetch(`${_api}collaborationInvitation/getCollaboration?projectId=${projectId}&userId=${userId}`, _requestOptionsGET(token))
        .then(response => response.json());
}


const declineInvitation = async (invitationId, token) => {
    return await fetch(`${_api}collaborationInvitation/declineInvitation/${invitationId}`, _requestOptionsWithoutBodyPATCH(token))
        .then(response => response.json());
}

const completedCollaborationInvitation = async (formData, token) => {
    return await fetch(`${_api}collaborationInvitation/complete`, _requestOptionsPOST(formData, token))
        .then(response => response.json());
}

const getCheckDeadline = async (token) => {
    return await fetch(`${_api}collaborationInvitation/checkDeadline`, _requestOptionsGET(token))
        .then(response => response.json());
}

export {
    createCollaborationInvitation,
    acceptCollaborationInvitation,
    declineCollaborationInvitation,
    editCollaborationInvitation,
    getCollaborationInvitation,

    declineInvitation,
    completedCollaborationInvitation,

    getCheckDeadline
}