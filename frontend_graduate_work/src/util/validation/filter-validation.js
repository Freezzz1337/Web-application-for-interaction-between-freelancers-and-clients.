const filterValidation = (formData) => {
    const errors = {};

    if (isNaN(formData.minBudget)) {
        errors.minBudget = "This field must be a number";
    } else if (parseInt(formData.minBudget) < 0) {
        errors.minBudget = "This field must not be less than 0";
    }


    if (isNaN(formData.maxBudget)) {
        errors.maxBudget = "This field must be a number";
    } else if (parseInt(formData.maxBudget) < 0) {
        errors.maxBudget = "This field must not be less than 0";
    }

    return errors;
}
export default filterValidation;