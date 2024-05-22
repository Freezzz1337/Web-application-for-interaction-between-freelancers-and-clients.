export const getStatusProjectText = (status) => {
    switch (status) {
        case "OPEN":
            return "Open";
        case "IN_PROGRESS":
            return "In Progress";
        case "COMPLETED":
            return "Completed";
        case "CANCELLED":
            return "Cancelled";
        default:
            return "Unknown";
    }
};