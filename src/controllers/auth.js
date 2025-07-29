import { registerUser, loginUser, logoutUser, refreshUsersSession, sendPassResetEmail, resetPassword } from "../services/auth.js";
import { THIRTY_DAYS } from "../constants/index.js";

export const registerUserController = async (req, res) => {
    // console.log(`at registerUserController => req.body: ${req.body}`);
    const user = await registerUser(req.body);
    // console.log(user);
    res.status(201).json({
        status: 201,
        message: "Successfully registered a user!",
        data: user
    });
};

export const loginUserController = async (req, res) => {
    console.log(`at loginUserController => req.body: ${req.body}`);
    const session = await loginUser(req.body);
    console.log(`at loginUserController => session: ${session}`);
    console.log(`at loginUserController => session.userId: ${session.userId}`);

    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });

    res.status(200).json({
        status: 200,
        message: "The user has been successfully loged in.",
        data: {
            accessToken: session.accessToken,
        }
    });
};

const setupSession = (res, session) => {
    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS)
    });
    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS)
    });
};

export const refreshUserSessionController = async (req, res) => {
    const session = await refreshUsersSession({
        sessionId: req.cookies.sessionId,
        refreshToken: req.cookies.refreshToken
    });
    setupSession(res, session);

    res.status(200).json({
        status: 200,
        message: "The session has been successfully refreshed.",
        data: {
            accessToken: session.accessToken
        }
    });
};

export const logoutUserController = async (req, res) => {
    if (req.cookies.sessionId) {
        await logoutUser(req.cookies.sessionId);
    }
    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");

    res.status(204).send();
};

export const requestResetPassController = async (req, res) => {
    await sendPassResetEmail(req.body.email);
    res.json({
        status: 200,
        message: "Reset password email has been successfully sent.",
        data: {}
    });
};

export const resetPassController = async (req, res) => {
    await resetPassword(req.body);
    res.json({
        status: 200,
        message: "Password has been successfully reset.",
        data: {}
    });
};
