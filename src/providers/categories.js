const categories = (validate, body, validationResult) => {
    return new Promise((resolve, reject) => {
        validate("categoryName", "categoryName Required field!!").notEmpty();
        validate("parrentID", "parrentID Required field!!").notEmpty();

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
    categories,
};