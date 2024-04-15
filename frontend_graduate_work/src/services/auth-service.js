const _api = "http://localhost:8080/";

const registration = async (formData) => {
    return await fetch(`${_api}auth/signup`, _requestOptionsPOST(formData))
        .then(response => response.json());
}

const authorization = async (formData) => {
    return await fetch(`${_api}auth/login`, _requestOptionsPOST(formData))
        .then(response => response.json());
}

const getUserData = async (token) => {
    return await fetch(`${_api}user/profile`, _requestOptionsGET(token))
        .then(response => response.json());
}

const editProfile = async (formData, token) => {
    return await fetch(`${_api}user/profile/edit`, _requestOptionsPOST(formData, token))
        .then(response => response.json());
}

const createProject = async (formData, token) => {
    console.log(formData);
    return await fetch(`${_api}project/create`, _requestOptionsPOST(formData, token))
        .then(response => response.json());
}

const _requestOptionsPOST = (formData, token = "") => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    return {
        method: "POST",
        headers: myHeaders,
        body: formData
    }
}

const _requestOptionsGET = (token = "") => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    return {
        method: "GET",
        headers: myHeaders,
    }
}


export {
    authorization,
    registration,
    getUserData,
    editProfile,

    createProject
}