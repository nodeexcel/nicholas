"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _retailers = require("../controllers/retailers");

var _retailers2 = _interopRequireDefault(_retailers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {

    /* Routes for categories */

    app.route("/retailers/createRetailers").post(_retailers2.default.createRetailers);

    app.route("/retailers/getRetailers").post(_retailers2.default.getRetailers);

    app.route("/retailers/updateRetailers").post(_retailers2.default.updateRetailers);

    app.route("/retailers/deleteRetailers/:id").post(_retailers2.default.deleteRetailers);

    return app;
};
//# sourceMappingURL=retailers.js.map