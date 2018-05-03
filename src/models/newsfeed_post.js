export default function(sequelize, DataTypes) {
    const newsfeed_post = sequelize.define("newsfeed_post", {
        title: DataTypes.STRING,
        userID: DataTypes.STRING,
        inspirationalPhotoURL: DataTypes.STRING,
        product1ID: DataTypes.STRING,
        product2ID: DataTypes.STRING,
        product3ID: DataTypes.STRING,
        product4ID: DataTypes.STRING,
    }, {
        freezeTableName: true,

    })

    return newsfeed_post;
}