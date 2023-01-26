export const getPaginationIndex = ({ page, limit }) => {
    return {
        start: (page - 1) * limit,
        end: page * limit,
    };
};
