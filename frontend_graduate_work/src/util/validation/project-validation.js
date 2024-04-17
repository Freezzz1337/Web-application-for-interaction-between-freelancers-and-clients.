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
    if (formData.deadline && new Date(formData.deadline) < new Date()) {
        errors.deadline = "The deadline must be a future date";
    }
    return errors;
}

const editProjectValidation = (formData) => {
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
    if (formData.deadline && new Date(formData.deadline) < new Date()) {
        errors.deadline = "The deadline must be a future date";
    }

    return errors;
}
export {
    createProjectValidation,
    editProjectValidation
}