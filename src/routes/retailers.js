import retailers from "../controllers/retailers";

export default (app) => {

    /* Routes for categories */

    app.route("/retailers/createRetailers").post(retailers.createRetailers);

    app.route("/retailers/getRetailers").post(retailers.getRetailers);

    app.route("/retailers/updateRetailers").post(retailers.updateRetailers);

    app.route("/retailers/deleteRetailers/:id").post(retailers.deleteRetailers);

    return app;
};