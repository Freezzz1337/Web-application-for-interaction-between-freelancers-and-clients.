const _api = "http://localhost:8080/";

const _requestOptionsGET = (token = "") => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    return {
        method: "GET",
        headers: myHeaders,
    }
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

const _requestOptionsPATCH = (formData, token = "") => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    return {
        method: "PATCH",
        headers: myHeaders,
        body: formData
    }
}


const _requestOptionsDELETE = (token = "") => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    return {
        method: "DELETE",
        headers: myHeaders
    };
};

export {
    _api,
    _requestOptionsGET,
    _requestOptionsPOST,
    _requestOptionsPATCH,
    _requestOptionsDELETE
}