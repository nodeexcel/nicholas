import user from "../controllers/user";

export default (app) => {

    /* Routes for user */

    app.route("/user/createUser").post(user.createUser);

    app.route("/user/updateUser").post(user.updateUser);

    app.route("/user/deleteUser/:id").post(user.deleteUser);

    return app;
};