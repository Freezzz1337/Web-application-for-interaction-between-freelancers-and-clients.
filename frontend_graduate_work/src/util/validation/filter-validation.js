const filterValidation = (formData) => {
    const errors = {};

    if (parseInt(formData.minBudget) < 0) {
        errors.minBudget = "This field must not be less than 0";
    }

    if (parseInt(formData.maxBudget) < 0) {
        errors.minBudget = "This field must not be less than 0";
    }

    return errors;
}
export default filterValidation;