import categories from "../controllers/categories";

export default (app) => {

    /* Routes for categories */

    app.route("/catogory/createCatogory").post(categories.createCatogory);

    app.route("/catogory/getAllCatogory").post(categories.getAllCatogory);


    return app;
};