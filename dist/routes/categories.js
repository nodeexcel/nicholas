"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _categories = require("../controllers/categories");

var _categories2 = _interopRequireDefault(_categories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {

    /* Routes for categories */

    app.route("/catogory/createCatogory").post(_categories2.default.createCategory);

    app.route("/catogory/getAllCatogory").post(_categories2.default.getAllCategory);

    app.route("/catogory/updateCatogory").post(_categories2.default.updateCategory);

    app.route("/catogory/deleteCatogory/:id").post(_categories2.default.deleteCategory);

    return app;
};
//# sourceMappingURL=categories.js.map