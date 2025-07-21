import { registerUser, loginUser } from "../services/auth.js";
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

    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now + THIRTY_DAYS),
    });

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: new Date(Date.now + THIRTY_DAYS),
    });

    res.status(200).json({
        status: 200,
        message: "The user has been successfully loged in.",
        data: {
            accessToken: session.accessToken,
        }
    });
};
