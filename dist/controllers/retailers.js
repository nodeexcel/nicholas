"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.retailersController = undefined;

var _BaseAPIController2 = require("./BaseAPIController");

var _BaseAPIController3 = _interopRequireDefault(_BaseAPIController2);

var _db = require("../db.js");

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var retailersController = exports.retailersController = function (_BaseAPIController) {
    _inherits(retailersController, _BaseAPIController);

    function retailersController() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, retailersController);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = retailersController.__proto__ || Object.getPrototypeOf(retailersController)).call.apply(_ref, [this].concat(args))), _this), _this.createRetailers = function (req, res, next) {
            _db2.default.retailers.create(req.body).then(function (data) {
                res.json({ status: 1, data: data });
            }, function (err) {
                return _this.handleErrorResponse(res, err);
            });
        }, _this.getRetailers = function (req, res, next) {
            _db2.default.retailers.findAll({}).then(function (data) {
                res.json({ status: 1, data: data });
            }, function (err) {
                return _this.handleErrorResponse(res, err);
            });
        }, _this.updateRetailers = function (req, res, next) {
            _db2.default.retailers.update(req.body, { where: { id: req.body.id } }).then(function (response) {
                res.json({ status: 1, data: response });
            }, function (err) {
                return _this.handleErrorResponse(res, err);
            });
        }, _this.deleteRetailers = function (req, res, next) {
            _db2.default.retailers.destroy({ where: { id: req.params.id } }).then(function (response) {
                res.json({ status: 1, data: response });
            }, function (err) {
                return _this.handleErrorResponse(res, err);
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return retailersController;
}(_BaseAPIController3.default);

var controller = new retailersController();
exports.default = controller;
//# sourceMappingURL=retailers.js.map