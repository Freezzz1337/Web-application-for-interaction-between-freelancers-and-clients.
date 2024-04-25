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

const getAllProjectsForEmployer = async (token) => {
    return await fetch(`${_api}project/getProjectsForEmployer`, _requestOptionsGET(token))
        .then(response => response.json());
}

const getProjectDetailsForEmployer = async (projectId, token) => {
    return await fetch(`${_api}project/projectDetails/${projectId}`, _requestOptionsGET(token))
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
const getAllProjectsForFreelancer = async (token) => {
    return await fetch(`${_api}project/getProjectsForFreelancer`, _requestOptionsGET(token))
        .then(response => response.json());
}

const getAllFilteredProjectsForFreelancer = async (formData, token) => {
    return await fetch(`${_api}project/filter`, _requestOptionsPOST(formData, token))
        .then(response => response.json());
}


export {
    createProject,
    getAllProjectsForEmployer,
    getProjectDetailsForEmployer,
    editProject,
    deleteProject,

    getAllProjectTypes,
    getSubprojectsTypes,

    getAllProjectsForFreelancer,
    getAllFilteredProjectsForFreelancer
}