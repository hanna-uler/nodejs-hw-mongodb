const parseContactType = (type) => {
    const isString = typeof type === "string";
    if (!isString) return;
    const isValidOption = (type) => ["work", "home", "personal"].includes(type);
    if (isValidOption(type)) return type;
    return undefined;
};

const parseIsFavourite = (isFav) => {
    const isString = typeof isFav === "string";
    if (!isString) return;
    if (isFav === "true") return true;
    if (isFav === "false") return false;
    return undefined;
};

export const parseFilterParams = (query) => {
    const { type, isFavourite } = query;
    const parsedType = parseContactType(type);
    const parsedIsFavourite = parseIsFavourite(isFavourite);
    return {
        type: parsedType,
        isFavourite: parsedIsFavourite,
    };
};
