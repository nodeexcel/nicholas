'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserController = undefined;

var _BaseAPIController2 = require('./BaseAPIController');

var _BaseAPIController3 = _interopRequireDefault(_BaseAPIController2);

var _db = require('../db.js');

var _db2 = _interopRequireDefault(_db);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _formidable = require('formidable');

var _formidable2 = _interopRequireDefault(_formidable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AdmZip = require('adm-zip');

var Kraken = require("kraken");

var UserController = exports.UserController = function (_BaseAPIController) {
    _inherits(UserController, _BaseAPIController);

    function UserController() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, UserController);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UserController.__proto__ || Object.getPrototypeOf(UserController)).call.apply(_ref, [this].concat(args))), _this), _this.uploadImage = function (req, res, next) {
            var kraken = new Kraken({
                "api_key": "ba861f2d7b7e398cefeb106ecdce58d7",
                "api_secret": "1a61f223803ed78b6cdd429511215aa3a6e82607"
            });
            console.log("]]]]]]]]]]]]]]]");
            var params = {
                url: "http://localhost:5001/msd1.jpg",
                wait: true,
                lossy: true
            };
            console.log(params);

            kraken.url(params, function (status) {
                console.log("=======================================");
                if (status.success) {
                    console.log("Success. Optimized image URL: %s", status.kraked_url);
                } else {
                    console.log("Fail. Error message: %s", status.message);
                }
            });

            // reading archives
            // console.log("=======================")
            // let form = new formidable.IncomingForm();
            // form.parse(req, function(err, fields, files) {
            //     // let new_path = path.join(__dirname, files.file.name);
            //     fs.readFile(files.file.path, function(err, data) {
            //         // response.pipe(file);
            //         // console.log(data.toString('utf8'), "kkkkkkkkkkkkkkkkkkkkk")
            //     })
            // })
            // var zip = new AdmZip("/var/www/html/msdpics.zip");
            // var zipEntries = zip.getEntries(); // an array of ZipEntry records
            // zipEntries.forEach(function(zipEntry) {
            //     if (!zipEntry.isDirectory) {
            //         // console.log(zipEntry.toString(), "============================"); // outputs zip entries information
            //         console.log(zipEntry.name, "============================"); // outputs zip entries information
            //     }
            // });

            // zip.extractAllTo( /*target path*/ "/home/etech", /*overwrite*/ true);
            // fs.unlink('/home/etech/msdpics', function() {
            //     console.log("success");
            //     res.json("success")
            // });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return UserController;
}(_BaseAPIController3.default);

var controller = new UserController();
exports.default = controller;
//# sourceMappingURL=imageProcess.js.map