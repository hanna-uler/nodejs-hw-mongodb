import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, TEMP_UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
        const uniqueSfx = Date.now();
        cb(null, `${uniqueSfx}_${file.originalname}`);
    }
});

export const upload = multer({ storage });
