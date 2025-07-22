import { getAllContacts, getContactById, createContact, updateContact, deleteContact } from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import createHttpError from "http-errors";

export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const userId = req.user._id;
    console.log("getContactsController => userId: ", userId);


// console.log("getContactsController => sortBy: ", sortBy, "sortOrder: ", sortOrder,"page: ", page,"perPage: ", perPage);

    const contacts = await getAllContacts({ userId, page, perPage, sortBy, sortOrder, filter });
    res.json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
    });
};

export const getContactByIdController = async (req, res, next) => {
    const contactId = req.params.contactId;
    const userId = req.user._id;
    console.log("getContactByIdController => userId: ", userId);

    const contact = await getContactById(userId, contactId);
    if (!contact) {
        throw createHttpError(404, "Contact is not found.");
    }
    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};

export const createContactController = async (req, res) => {
    const userId = req.user._id;
    const payload = { ...req.body, userId };
    const contact = await createContact(payload);
    console.log("createContactController => payload: ", payload);

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: contact,
    });
};

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
        next(createHttpError(404, "Contact is not found."));
        return;
    }
    res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result,
    });
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId);
    if (!contact) {
        next(createHttpError(404, "Contact is not found."));
        return;
    }
    res.status(204).send();
};
