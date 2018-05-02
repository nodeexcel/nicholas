const createUser = (validate, body, validationResult) => {
    return new Promise((resolve, reject) => {

        validationResult.then(function(result) {
            if (!result.isEmpty()) {
                reject(result.array()[0].msg);
            } else {
                resolve(body);
            }
        });
    });
};


export default {
    createUser,
};