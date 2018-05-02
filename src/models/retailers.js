export default function(sequelize, DataTypes) {
    const retailers = sequelize.define("retailers", {
        idRetailers: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        retailers: DataTypes.STRING,
        retailerID: DataTypes.STRING,
    }, {
        freezeTableName: true,

    })

    return retailers;
}