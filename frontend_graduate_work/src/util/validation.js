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
    if (!formData.username) {
        errors.username = "The username field should not be empty";
    }
    return errors;
}

const editProfileValidation = (formData) => {
    const errors = {};

    if (!formData.fullName) {
        errors.fullName = "The username field should not be empty";
    }
    return errors;
}

const createProjectValidation = (formData) => {
    const errors = {};

    if (!formData.title) {
        errors.title = "The title field should not be empty";
    }
    if (!formData.description) {
        errors.description = "The description field should not be empty";
    }
    if (formData.budget <= 0) {
        errors.budget = "The budget field must be greater than 0";
    }
    if (formData.deadline && new Date(formData.deadline) < new Date()){
        errors.deadline = "The deadline must be a future date";
    }
    return errors;
}
export {
    authorizationValidation,
    registrationValidation,
    editProfileValidation,
    createProjectValidation
}