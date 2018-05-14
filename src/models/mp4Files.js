export default function(sequelize, DataTypes) {
    const mp4Files = sequelize.define("mp4Files", {
        cloudUrl: DataTypes.STRING
    }, {
        freezeTableName: true,

    })
    return mp4Files;
}