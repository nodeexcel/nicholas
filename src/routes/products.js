import products from "../controllers/products";

export default (app) => {

    /* Routes for products */

    app.route("/products/createProducts").post(products.createProducts);

    app.route("/products/getProducts").post(products.getProducts);


    return app;
};