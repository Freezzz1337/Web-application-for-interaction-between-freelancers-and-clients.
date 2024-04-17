const editProfileValidation = (formData) => {
    const errors = {};

    if (!formData.fullName) {
        errors.fullName = "The username field should not be empty";
    }
    return errors;
}

export {
    editProfileValidation
}