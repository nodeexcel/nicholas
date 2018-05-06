"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {
    var users = sequelize.define("users", {
        Name: DataTypes.STRING,
        Description: DataTypes.STRING,
        Profile_photo_url: DataTypes.STRING,
        CoatsAndJacketBudget: DataTypes.STRING,
        DressesBudgets: DataTypes.STRING,
        TrousersAndSkirtsBudget: DataTypes.STRING,
        TopsBudget: DataTypes.STRING,
        user_type: {
            type: DataTypes.ENUM,
            values: ["Standard", "Contributor", "Influencer"]
        },
        ShoesAndBagsBudget: DataTypes.STRING,
        ShopCategoriesID1: DataTypes.INTEGER,
        ShopCategoriesID2: DataTypes.INTEGER,
        ShopCategoriesID3: DataTypes.INTEGER,
        ShopCategoriesID4: DataTypes.INTEGER,
        ShopCategoriesID5: DataTypes.INTEGER
    }, {
        freezeTableName: true

    });

    return users;
};
//# sourceMappingURL=user.js.map