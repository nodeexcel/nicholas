"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require("../controllers/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {

    /* Routes for user */

    app.route("/user/createUser").post(_user2.default.createUser);

    app.route("/user/updateUser").post(_user2.default.updateUser);

    app.route("/user/deleteUser/:id").post(_user2.default.deleteUser);

    return app;
};
//# sourceMappingURL=user.js.map