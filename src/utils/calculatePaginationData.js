export const calculatePaginationData = (count, page, perPage) => {
    // console.log("calculatePaginationData => count: ", count, "page: ", page,"perPage: ", perPage);
    const totalPages = Math.ceil(count / perPage);
    // console.log("calculatePaginationData => totalPages: ", totalPages);
    const hasNextPage = Boolean(totalPages - page);
    const hasPreviousPage = page !== 1;

    return {
        page,
        perPage,
        totalItems: count,
        totalPages,
        hasNextPage,
        hasPreviousPage,
    };
};
