import {_api, _requestOptionsGET, _requestOptionsPATCH} from "./apiRequestHelpers";

const getUserData = async (token) => {
    return await fetch(`${_api}user/profile`, _requestOptionsGET(token))
        .then(response => response.json());
}

const editProfile = async (formData, token) => {
    return await fetch(`${_api}user/profile/edit`, _requestOptionsPATCH(formData, token))
        .then(response => response.json());
}
export {
    getUserData,
    editProfile
}