import { hashSync, compareSync } from "bcryptjs";

import { UserModel } from "../models/UserModel";

class AuthController {
    static registerView(req, res) {
        let message = "";

        res.render("register", { message });
    }

    static async registerNewUser({ body: { username, email, password } }, res) {
        try {
            password = hashSync(password);

            let newUser = new UserModel({ username, email, password });

            await newUser.save();

            res.redirect("/auth/login");
        } catch (error) {
            res.render("register", { message: "Error..!" });
        }
    }

    static loginView(req, res) {
        res.render("login", { message: "" });
    }

    static async loginUser({ session, body: { email, password } }, res) {
        try {
            let user = await UserModel.findOne({ email }); // or null

            // user is null or object => if null -> user doesn't exist in database
            if (!user) {
                res.render("login", { message: "User is not found..!" });
                return;
            }

            // if user has been found
            let passwordIsOK = compareSync(password, user.password);

            if (!passwordIsOK) {
                res.render("login", { message: "Invalid password..!" });
                return;
            }

            // req.session
            session.user = user;

            res.redirect("/admin");
        } catch (error) {
            res.render("login", { message: "Error..!" });
        }
    }

    static logout(req, res) {
        req.session.destroy();
        res.redirect("/auth/login");
    }
}

export default AuthController;