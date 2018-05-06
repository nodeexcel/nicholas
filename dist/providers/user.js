"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var createUser = function createUser(validate, body, validationResult) {
    return new Promise(function (resolve, reject) {

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
    createUser: createUser
};
//# sourceMappingURL=user.js.map