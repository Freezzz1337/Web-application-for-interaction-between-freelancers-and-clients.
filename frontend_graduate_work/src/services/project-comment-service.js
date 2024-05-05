import {_api, _requestOptionsPOST} from "./apiRequestHelpers";

const createProjectComment = async (formData, token) => {
    return await fetch(`${_api}projectComment/create`, _requestOptionsPOST(formData, token))
        .then(response => response.json());
}

export {
    createProjectComment
}