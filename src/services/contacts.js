import { SORT_ORDER } from "../constants/index.js";
import { ContactsCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
// console.log("calculatePaginationData => count: ", count, "page: ", page,"perPage: ", perPage);
// console.log("calculatePaginationData => totalPages: ", totalPages);

export const getAllContacts = async ({
    page = 1,
    perPage = 10,
    sortBy = "_id",
    sortOrder = SORT_ORDER.ASC,
    filter = {}
}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const contactsQuery = ContactsCollection.find();
    if (filter.type) {
        contactsQuery.where("contactType").equals(filter.type);
    }
    if (filter.isFavorite) {
        contactsQuery.where("isFavorite").equals(filter.isFavorite);
    }
    // const contactsCount = await ContactsCollection.find()
    //     .merge(contactsQuery)
    //     .countDocuments();
    // const contacts = await contactsQuery
    //     .skip(skip)
    //     .limit(limit)
    //     .sort({ [sortBy]: sortOrder })
    //     .exec();

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

export const getContactById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;

};

export const createContact = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
    const rawResult = await ContactsCollection.findOneAndUpdate({ _id: contactId }, payload, { new: true, includeResultMetadata: true, ...options });
    if (!rawResult || !rawResult.value) return null;
    return rawResult.value;
};

export const deleteContact = async (contactId) => {
    const contact = await ContactsCollection.findOneAndDelete({ _id: contactId });
    return contact;
};
