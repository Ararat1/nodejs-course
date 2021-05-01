import UserModel from "../models/UserModel";

const uniqueEmail = async ({ body: { email } }, res, next) => {
    try {
        let user = await UserModel.findOne({ email });

        if (user) {
            return res.status(409).json({ error: `${user.email} is already taken` });
        }

        next();
    } catch ({ message }) {
        res.json({ error: message });
    }
};

export { uniqueEmail };