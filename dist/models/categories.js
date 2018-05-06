"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {
    var categories = sequelize.define("categories", {
        categoryName: DataTypes.STRING,
        parentID: DataTypes.STRING
    }, {
        freezeTableName: true

    });

    return categories;
};
//# sourceMappingURL=categories.js.map