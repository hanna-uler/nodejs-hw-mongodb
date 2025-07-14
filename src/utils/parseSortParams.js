import { SORT_ORDER } from "../constants/index.js";

const parseSortOrder = (sortOrder) => {
    const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
    if (isKnownOrder) return sortOrder;
    return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
    if (sortBy === "name") {
        return sortBy;
    }
    return "_id";

    // To give more sorting options:
    // const keyOfContact = [
    //     "_id",
    //     "name",
    //     "phoneNumber",
    //     "email",
    //     "createdAt",
    //     "updatedAt",
    // ];
    // if (keyOfContact.includes(sortBy)) {
    //     return sortBy;
    // }
    // return "_id";
};

export const parseSortParams = (query) => {
    const { sortOrder, sortBy } = query;
    const parsedSortOrder = parseSortOrder(sortOrder);
    const parsedSortBy = parseSortBy(sortBy);
    return {
        sortBy: parsedSortBy,
        sortOrder: parsedSortOrder,
    };
};
