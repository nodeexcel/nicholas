"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(_sequelize);

var _models = require("./models");

var _models2 = _interopRequireDefault(_models);

var _environment = require("./environment.js");

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import migrations from './migrations'
var db = {};
var sequelize = new _sequelize2.default(_environment2.default.config.db.name, _environment2.default.config.db.username, _environment2.default.config.db.password, { port: _environment2.default.config.db.port, host: _environment2.default.config.db.host, dialect: 'mysql', logging: false });

// load models
Object.keys(_models2.default).forEach(function (modelName) {
    var model = _models2.default[modelName](sequelize, _sequelize2.default.DataTypes, _sequelize2.default);
    db[modelName] = model;
}, function (err) {
    console.log(err);
});

// invoke associations on each of the models
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
}, function (err) {
    console.log(err);
});

sequelize.sync().then(function () {});

exports.default = Object.assign({}, db, {
    sequelize: sequelize,
    Sequelize: _sequelize2.default
});
//# sourceMappingURL=db.js.map