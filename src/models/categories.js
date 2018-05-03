export default function(sequelize, DataTypes) {
    const categories = sequelize.define("categories", {
        categoryName: DataTypes.STRING,
        parentID: DataTypes.STRING,
    }, {
        freezeTableName: true,

    })

    return categories;
}