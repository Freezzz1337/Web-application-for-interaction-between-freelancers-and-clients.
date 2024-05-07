import {_api, _requestOptionsPOST} from "./apiRequestHelpers";

const sentFirstMessage = async (formData, token) => {
    return await fetch(`${_api}chat/firstMessage`, _requestOptionsPOST(formData, token))
        .then(response => response.json());
}

export {
    sentFirstMessage
}