export const convertFileToBase64 = (file, callback) => {
    const reader = new FileReader();

    reader.onloadend = () => {
        const base64String = reader.result;
        const index = base64String.indexOf(",");

        const result = base64String.substring(index + 1);
        callback(result);
    }

    if (file) {
        reader.readAsDataURL(file);
    }
}