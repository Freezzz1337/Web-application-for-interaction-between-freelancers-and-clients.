import {_api, _requestOptionsGET, _requestOptionsPOST} from "./apiRequestHelpers";

const sentFirstMessage = async (formData, token) => {
    return await fetch(`${_api}chatMessage/firstMessage`, _requestOptionsPOST(formData, token))
        .then(response => response.json());
}
const getAllProjectsWithChats = async (token) => {
    return await fetch(`${_api}chat/getAllProjectsWithChats`, _requestOptionsGET(token))
        .then(response => response.json());
}

const getAllUsersChats = async (projectId, token) => {
    return await fetch(`${_api}chat/getAllUserChats/${projectId}`, _requestOptionsGET(token))
        .then(response => response.json());
}

const getChat = async (userId, projectId, token) => {
    return await fetch(`${_api}chat/getChat?userId=${userId}&projectId=${projectId}`, _requestOptionsGET(token))
        .then(response => response.json());
}

export {
    sentFirstMessage,

    getAllProjectsWithChats,

    getAllUsersChats,

    getChat
}