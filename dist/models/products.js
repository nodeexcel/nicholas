"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {
    var products = sequelize.define("products", {
        ProductID: DataTypes.STRING,
        Category: DataTypes.STRING,
        Subcategory: DataTypes.STRING,
        Colour1: DataTypes.STRING,
        Colour2: DataTypes.STRING,
        Colour3: DataTypes.STRING,
        ProductName: DataTypes.STRING,
        Designer: DataTypes.STRING,
        Description: DataTypes.STRING,
        Retailer: DataTypes.STRING,
        Price: DataTypes.INTEGER,
        RetailerURL: DataTypes.STRING,
        ImageThumbnaiURL: DataTypes.STRING,
        ImageFullsizeURL: DataTypes.STRING
    }, {
        freezeTableName: true
    });

    return products;
};
//# sourceMappingURL=products.js.map