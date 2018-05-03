import Sequelize from "sequelize";
// import migrations from './migrations'
import models from "./models";
import environment from "./environment.js";

const db = {};
const sequelize = new Sequelize(environment.config.db.name, environment.config.db.username, environment.config.db.password, { port: environment.config.db.port, host: environment.config.db.host, dialect: 'mysql', logging: false });

// load models
Object.keys(models).forEach((modelName) => {
    const model = models[modelName](sequelize, Sequelize.DataTypes, Sequelize);
    db[modelName] = model;
}, (err) => { console.log(err) });

// invoke associations on each of the models
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
}, (err) => { console.log(err) });

sequelize.sync().then(() => {})

export default Object.assign({}, db, {
    sequelize,
    Sequelize
});