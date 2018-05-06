"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserController = undefined;

var _BaseAPIController2 = require("./BaseAPIController");

var _BaseAPIController3 = _interopRequireDefault(_BaseAPIController2);

var _user = require("../providers/user");

var _user2 = _interopRequireDefault(_user);

var _db = require("../db.js");

var _db2 = _interopRequireDefault(_db);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _formidable = require("formidable");

var _formidable2 = _interopRequireDefault(_formidable);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _csvjson = require("csvjson");

var _csvjson2 = _interopRequireDefault(_csvjson);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserController = exports.UserController = function (_BaseAPIController) {
    _inherits(UserController, _BaseAPIController);

    function UserController() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, UserController);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UserController.__proto__ || Object.getPrototypeOf(UserController)).call.apply(_ref, [this].concat(args))), _this), _this.createProducts = function (req, res, next) {
            var form = new _formidable2.default.IncomingForm();
            form.parse(req, function (err, fields, files) {
                // let new_path = path.join(__dirname, files.file.name);
                _fs2.default.readFile(files.file.path, function (err, data) {
                    var csv = data.toString('utf8');
                    var lines = csv.split("\n");
                    var result = [];
                    var headers = lines[0].split(",");
                    for (var i = 1; i < lines.length - 1; i++) {
                        var obj = {};
                        var currentline = lines[i].split(/,|"/);
                        for (var j = 0; j < headers.length; j++) {
                            obj[headers[j]] = currentline[j] ? currentline[j] : null;
                        }
                        result.push(obj);
                    }

                    _db2.default.products.findAll({}).then(function (resp) {
                        _lodash2.default.map(result, function (val, key) {
                            return _lodash2.default.remove(resp, function (index) {
                                return index.ProductID == val.ProductID;
                            });
                        });
                    });
                    _lodash2.default.forEach(result, function (val, key) {
                        _db2.default.products.findOne({ where: { ProductID: val.ProductID } }).then(function (product) {
                            if (product) {
                                _db2.default.products.update(val, { where: { ProductID: val.ProductID } }).then(function (data) {});
                            } else {
                                _db2.default.products.create(val).then(function (data) {});
                            }
                        });
                        if (key == result.length - 1) {
                            res.json({ status: 1, message: "success" });
                        }
                    });
                });
            });
        }, _this.getProducts = function (req, res, next) {
            _db2.default.products.findAll({}).then(function (data) {
                res.json({ status: 1, data: data });
            }, function (err) {
                return _this.handleErrorResponse(res, err);
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return UserController;
}(_BaseAPIController3.default);

var controller = new UserController();
exports.default = controller;
//# sourceMappingURL=products.js.map