import { SORT_ORDER } from "../constants/index.js";
import { ContactsCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
// console.log("calculatePaginationData => count: ", count, "page: ", page,"perPage: ", perPage);

export const getAllContacts = async ({
    userId,
    page = 1,
    perPage = 10,
    sortBy = "_id",
    sortOrder = SORT_ORDER.ASC,
    filter = {}
}) => {
    console.log("getAllContacts => userId: ", userId);
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const contactsQuery = ContactsCollection.find({userId});
    if (filter.type) {
        contactsQuery.where("contactType").equals(filter.type);
    }
    if (filter.isFavourite) {
        contactsQuery.where("isFavourite").equals(filter.isFavourite);
    }

    const [contactsCount, contacts] = await Promise.all([
        ContactsCollection
            .find()
            .merge(contactsQuery)
            .countDocuments(),
        contactsQuery
            .skip(skip)
            .limit(limit)
            .sort({ [sortBy]: sortOrder })
            .exec()
    ]);

    const paginationData = calculatePaginationData(contactsCount, page, perPage);
    return {
        data: contacts,
        ...paginationData,
    };
};

export const getContactById = async (userId, contactId ) => {
    console.log("getContactById => userId: ", userId);
    const contact = await ContactsCollection.findOne({ userId, _id: contactId });
    console.log("getContactById => contact: ", contact);
    return contact;
};

export const createContact = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
};

export const updateContact = async (userId, contactId, payload, options = {}) => {
    const rawResult = await ContactsCollection.findOneAndUpdate({ _id: contactId, userId }, payload, { new: true, includeResultMetadata: true, ...options });
    if (!rawResult || !rawResult.value) return null;
    return rawResult.value;
};

export const deleteContact = async (userId, contactId) => {
    const contact = await ContactsCollection.findOneAndDelete({ _id: contactId, userId });
    return contact;
};
