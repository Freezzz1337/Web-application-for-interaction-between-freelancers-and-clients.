const formatCreatedAtDate = (date) =>{
    const createdAt = new Date(date);
    const now = new Date();

    const diff = Math.floor((now - createdAt) / 1000);
    let result;

    switch (true) {
        case diff < 60:
            result = `${diff} seconds ago`;
            break;
        case diff < 3600:
            const minutes = Math.floor(diff / 60);
            result = `${minutes} minutes ago`;
            break;
        case diff < 86400:
            const hours = Math.floor(diff / 3600);
            result = `${hours} hours ago`;
            break;
        default:
            const days = Math.floor(diff / 86400);
            result = `${days} days ago`;
    }
    return result;
}
export default formatCreatedAtDate;