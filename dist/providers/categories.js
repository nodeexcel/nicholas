"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var categories = function categories(validate, body, validationResult) {
    return new Promise(function (resolve, reject) {
        validate("categoryName", "categoryName Required field!!").notEmpty();
        validate("parrentID", "parrentID Required field!!").notEmpty();

        validationResult.then(function (result) {
            if (!result.isEmpty()) {
                reject(result.array()[0].msg);
            } else {
                resolve(body);
            }
        });
    });
};

exports.default = {
    categories: categories
};
//# sourceMappingURL=categories.js.map