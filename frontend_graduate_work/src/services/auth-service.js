import {_api, _requestOptionsPOST} from "./apiRequestHelpers";

const registration = async (formData) => {
    return await fetch(`${_api}auth/signup`, _requestOptionsPOST(formData))
        .then(response => response.json());
}

const authorization = async (formData) => {
    return await fetch(`${_api}auth/login`, _requestOptionsPOST(formData))
        .then(response => response.json());
}

export {
    authorization,
    registration,
}