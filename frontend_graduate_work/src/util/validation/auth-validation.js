const authorizationValidation = (formData) => {
    const errors = {};

    if (!formData.email) {
        errors.email = "The email field should not be empty";
    }
    if (!formData.password) {
        errors.password = "The password field should not be empty";
    }

    if (formData.password.length < 8) {
        errors.password = "The password must be at least 8 characters";
    }
    return errors;
}

const registrationValidation = (formData) => {
    const errors = {};

    if (!formData.fullName) {
        errors.fullName = "The username field should not be empty";
    }
    if (!formData.email) {
        errors.email = "The email field should not be empty";
    }
    if (!formData.password) {
        errors.password = "The password field should not be empty";
    }
    if (formData.password.length < 8) {
        errors.password = "The password must be at least 8 characters";
    }
    return errors;
}

export {
    authorizationValidation,
    registrationValidation
}