export default function(sequelize, DataTypes) {
    const categories = sequelize.define("categories", {
        categoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        categoryName: DataTypes.STRING,
        parentID: DataTypes.STRING,
    }, {
        freezeTableName: true,

    })

    return categories;
}