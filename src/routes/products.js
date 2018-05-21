import products from "../controllers/products";

export default (app) => {

    /* Routes for products */

    app.route("/products/createProducts").post(products.createProducts);

    app.route("/products/getProducts").get(products.getProducts);

    app.route("/products/searchProducts/:productID").get(products.searchProducts);


    return app;
};