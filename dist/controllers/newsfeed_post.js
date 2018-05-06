"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.newsfeed_postController = undefined;

var _BaseAPIController2 = require("./BaseAPIController");

var _BaseAPIController3 = _interopRequireDefault(_BaseAPIController2);

var _user = require("../providers/user");

var _user2 = _interopRequireDefault(_user);

var _db = require("../db.js");

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var newsfeed_postController = exports.newsfeed_postController = function (_BaseAPIController) {
    _inherits(newsfeed_postController, _BaseAPIController);

    function newsfeed_postController() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, newsfeed_postController);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = newsfeed_postController.__proto__ || Object.getPrototypeOf(newsfeed_postController)).call.apply(_ref, [this].concat(args))), _this), _this.createNewsfeedPost = function (req, res, next) {
            _db2.default.newsfeed_post.create(req.body).then(function (data) {
                res.json({ status: 1, data: data });
            }, function (err) {
                return _this.handleErrorResponse(res, err);
            });
        }, _this.getNewsfeedPost = function (req, res, next) {
            _db2.default.newsfeed_post.findAll({}).then(function (data) {
                res.json({ status: 1, data: data });
            }, function (err) {
                return _this.handleErrorResponse(res, err);
            });
        }, _this.updateNewsfeedPost = function (req, res, next) {
            _db2.default.newsfeed_post.update(req.body, { where: { id: req.body.id } }).then(function (response) {
                res.json({ status: 1, data: response });
            }, function (err) {
                return _this.handleErrorResponse(res, err);
            });
        }, _this.deleteNewsfeedPost = function (req, res, next) {
            _db2.default.newsfeed_post.destroy({ where: { id: req.params.id } }).then(function (response) {
                res.json({ status: 1, data: response });
            }, function (err) {
                return _this.handleErrorResponse(res, err);
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return newsfeed_postController;
}(_BaseAPIController3.default);

var controller = new newsfeed_postController();
exports.default = controller;
//# sourceMappingURL=newsfeed_post.js.map