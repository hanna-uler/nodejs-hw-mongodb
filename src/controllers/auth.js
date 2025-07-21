import { registerUser, loginUser } from "../services/auth.js";

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

    await loginUser(req.body);
};
