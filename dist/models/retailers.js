"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {
    var retailers = sequelize.define("retailers", {
        retailers: DataTypes.STRING,
        retailerID: DataTypes.STRING
    }, {
        freezeTableName: true

    });

    return retailers;
};
//# sourceMappingURL=retailers.js.map