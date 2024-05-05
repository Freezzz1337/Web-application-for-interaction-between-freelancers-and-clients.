const createCommentValidation = (formData) => {
    const errors = {};

    if (!formData.commentText) {
        errors.commentText = "The comment field should not be empty";
    }
    if (parseInt(formData.proposedPrice) <= 0) {
        errors.proposedPrice = "The budget field must be greater than 0";
    }
    if (formData.deadline && new Date(formData.deadline) < new Date()) {
        errors.deadline = "The deadline must be a future date";
    }
    return errors;
}

export {
    createCommentValidation
}