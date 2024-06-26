import {
    _api,
    _requestOptionsDELETE,
    _requestOptionsGET,
    _requestOptionsPATCH,
    _requestOptionsPOST
} from "./apiRequestHelpers";

const createProject = async (formData, token) => {
    return await fetch(`${_api}project/create`, _requestOptionsPOST(formData, token))
        .then(response => response.json());
}

const getProjectDetailsForEmployer = async (projectId, token) => {
    return await fetch(`${_api}project/projectDetailsForEmployer/${projectId}`, _requestOptionsGET(token))
        .then(response => response.json());
}

const getProjectDetailsForFreelancer = async (projectId, token) => {
    return await fetch(`${_api}project/projectDetailsForFreelancer/${projectId}`, _requestOptionsGET(token))
        .then(response => response.json());
}


const editProject = async (formData, token) => {
    return await fetch(`${_api}project/edit`, _requestOptionsPATCH(formData, token))
        .then(response => response.json());
}

const deleteProject = async (projectId, token) => {
    return await fetch(`${_api}project/delete/${projectId}`, _requestOptionsDELETE(token))
        .then(response => response.json());
}


const getAllProjectTypes = async (token) => {
    return await fetch(`${_api}project/getTypes`, _requestOptionsGET(token))
        .then(response => response.json());
}

const getSubprojectsTypes = async (token, id) => {
    return await fetch(`${_api}project/getSubprojectsTypes/${id}`, _requestOptionsGET(token))
        .then(response => response.json());
}
const getAllProjectsForFreelancer = async (token, page = 0) => {
    return await fetch(`${_api}project/getProjectsForFreelancer?page=${page}`, _requestOptionsGET(token))
        .then(response => response.json());
}

const getAllFilteredProjectsForFreelancer = async (formData, token, page = 0) => {
    return await fetch(`${_api}project/filter?page=${page}`, _requestOptionsPOST(formData, token))
        .then(response => response.json());
}

const getProjectForCollaborationInvitation = async (projectId, token) => {
    return await fetch(`${_api}project/getProjectForCollaborationInvitation/${projectId}`, _requestOptionsGET(token))
        .then(response => response.json());
}


const getAllProjectsForEmployer = async (token) => {
    return await fetch(`${_api}project/getProjectsForEmployer`, _requestOptionsGET(token))
        .then(response => response.json());
}

const getAllOpenProjectsForEmployer = async (token) => {
    return await fetch(`${_api}project/getOpenProjectsForEmployer`, _requestOptionsGET(token))
        .then(response => response.json());
}

const getAllInProgressProjectsForEmployer = async (token) => {
    return await fetch(`${_api}project/getInProgressProjectsForEmployer`, _requestOptionsGET(token))
        .then(response => response.json());
}

const getAllCompletedProjectsForEmployer = async (token) => {
    return await fetch(`${_api}project/getCompletedProjectsForEmployer`, _requestOptionsGET(token))
        .then(response => response.json());
}

export {
    createProject,
    getProjectDetailsForEmployer,
    editProject,
    deleteProject,

    getAllProjectsForEmployer,
    getAllOpenProjectsForEmployer,
    getAllInProgressProjectsForEmployer,
    getAllCompletedProjectsForEmployer,

    getAllProjectTypes,
    getSubprojectsTypes,

    getProjectDetailsForFreelancer,
    getAllProjectsForFreelancer,
    getAllFilteredProjectsForFreelancer,

    getProjectForCollaborationInvitation
}