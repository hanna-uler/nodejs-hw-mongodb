import { Router } from "express";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema, loginUserSchema, requestResetPassSchema, resetPassSchema } from "../validation/auth.js";
import { registerUserController,loginUserController, logoutUserController, refreshUserSessionController, requestResetPassController, resetPassController } from "../controllers/auth.js";
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));
router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));
router.post('/refresh', ctrlWrapper(refreshUserSessionController));
router.post('/logout', ctrlWrapper(logoutUserController));
router.post('/send-reset-email', validateBody(requestResetPassSchema), ctrlWrapper(requestResetPassController));
router.post('/reset-pwd', validateBody(resetPassSchema), ctrlWrapper(resetPassController));

export default router;
