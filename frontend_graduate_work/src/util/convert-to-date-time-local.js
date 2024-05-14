export const convertToDateTimeLocal = (isoDateTimeString) => {
    const date = new Date(isoDateTimeString);
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return date.toISOString().slice(0, -1);
};
