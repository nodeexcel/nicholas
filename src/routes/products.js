import products from "../controllers/products";

export default (app) => {

    /* Routes for products */

    app.route("/products/createProducts").post(products.createProducts);

    return app;
};