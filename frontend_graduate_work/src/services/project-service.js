import {_api, _requestOptionsGET, _requestOptionsPATCH, _requestOptionsPOST} from "./apiRequestHelpers";

const createProject = async (formData, token) => {
    return await fetch(`${_api}project/create`, _requestOptionsPOST(formData, token))
        .then(response => response.json());
}

const getAllProjectsForEmployer = async (token) => {
    return await fetch(`${_api}project/getProjects`, _requestOptionsGET(token))
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

export {
    createProject,
    getAllProjectsForEmployer,
    getProjectDetailsForEmployer,
    editProject
}