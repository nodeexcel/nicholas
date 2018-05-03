export default function(sequelize, DataTypes) {
    const retailers = sequelize.define("retailers", {
        retailers: DataTypes.STRING,
        retailerID: DataTypes.STRING,
    }, {
        freezeTableName: true,

    })

    return retailers;
}