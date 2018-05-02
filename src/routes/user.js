import user from "../controllers/user";

export default (app) => {

    /* Routes for user */

    app.route("/user/createUser").post(user.createUser);

    return app;
};