import categories from "../controllers/categories";

export default (app) => {

    /* Routes for categories */

    app.route("/catogory/createCatogory").post(categories.createCategory);

    app.route("/catogory/getAllCatogory").post(categories.getAllCategory);

    app.route("/catogory/updateCatogory").post(categories.updateCategory);

    app.route("/catogory/deleteCatogory/:id").post(categories.deleteCategory);

    return app;
};