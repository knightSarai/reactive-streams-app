export const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title = "You must enter the title";
    }
    if (!formValues.description) {
        errors.description = "You must enter a description"
    }
    return errors;
}