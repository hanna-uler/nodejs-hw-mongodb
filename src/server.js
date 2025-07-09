import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(getEnvVar("PORT", 3000));

export default function setupServer() {
    const app = express();

    app.use(express.json())
    app.use(cors());
    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.get('/contacts', async (req, res) => {
        const contacts = await getAllContacts();
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts,
        });
    });
    app.get('/contacts/:contactId', async (req, res) => {
        const contactId = req.params.contactId;
        const contact = await getContactById(contactId);
        if (contact === null) {
            return res
                .status(404)
                .json({ message: "Contact not found" })
        }
        res.json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });
    });
    app.use((req, res) => {
        res.status(404).json({
            message: 'Not found',
        });
      });
    app.listen(PORT, (error) => {
        if (error) {
            throw error;
        }
        console.log(`Server is running on port ${PORT}`)
    });
};
