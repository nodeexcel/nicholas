import imageProcess from "../controllers/imageProcess";

export default (app) => {

    /* Routes for imageProcess */

    app.route("/imageProcess/uploadImage").post(imageProcess.uploadImage);

    app.route("/imageProcess/uploadMp4").post(imageProcess.uploadMp4);

    app.route("/imageProcess/getMp4").get(imageProcess.getMp4);

    return app;
};