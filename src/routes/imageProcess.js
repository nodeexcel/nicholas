import imageProcess from "../controllers/imageProcess";

export default (app) => {

    /* Routes for imageProcess */

    app.route("/imageProcess/uploadImage").post(imageProcess.uploadImage);

    return app;
};