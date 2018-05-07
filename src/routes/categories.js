import categories from "../controllers/categories";

export default (app) => {

    /* Routes for categories */

    app.route("/catogory/createCatogory").post(categories.createCategory);

    app.route("/catogory/getAllCatogory").get(categories.getAllCategory);

    app.route("/catogory/updateCatogory").put(categories.updateCategory);

    app.route("/catogory/deleteCatogory/:id").delete(categories.deleteCategory);

    return app;
};