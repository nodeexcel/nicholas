"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _imageProcess = require("../controllers/imageProcess");

var _imageProcess2 = _interopRequireDefault(_imageProcess);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {

    /* Routes for imageProcess */

    app.route("/imageProcess/uploadImage").post(_imageProcess2.default.uploadImage);

    return app;
};
//# sourceMappingURL=imageProcess.js.map