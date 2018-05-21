import BaseAPIController from "./BaseAPIController";
import provideUser from "../providers/user";
import db from '../db.js';
import _ from "lodash";
import formidable from "formidable";
import fs from "fs";
import csvjson from "csvjson";
import path from "path";

export class UserController extends BaseAPIController {

    createProducts = (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            if (files.file) {
                if (files.file['name'].substr(files.file['name'].lastIndexOf('.') + 1).toLowerCase() != 'csv') {
                    res.status(400).json({ error: 1, message: "please upload csv file" })
                } else {
                    fs.readFile(files.file.path, function(err, data) {
                        var csv = data.toString('utf8')
                        var lines = csv.split("\n");
                        var result = [];
                        var headers = lines[0].split(",");
                        for (var i = 1; i < lines.length; i++) {
                            var obj = {};
                            var currentline = lines[i].split(/,/);
                            for (var j = 0; j < headers.length; j++) {

                                obj[headers[j]] = currentline[j] ? currentline[j] : null;
                            }
                            result.push(obj);
                        }

                        db.products.findAll({}).then((resp) => {
                            var arrToDelete = []
                            _.map(resp, (val, key) => {
                                let findProduct = _.find(result, function(get) { return get.ProductID == val.ProductID; });
                                if (!findProduct) {
                                    arrToDelete.push(val.ProductID)
                                }
                            })
                            db.products.destroy({ where: { ProductID: arrToDelete } }).then((data) => {
                                console.log(data, "deleted")
                            })
                        })

                        _.forEach(result, (val, key) => {
                            delete val.ImageFullsizeURL;
                            db.products.findOne({ where: { ProductID: val.ProductID } }).then((product) => {
                                if (product) {
                                    db.products.update(val, { where: { ProductID: val.ProductID } }).then((data) => {})
                                } else {
                                    db.products.create(val).then((data) => {})
                                }
                            })
                            if (key == result.length - 1) {
                                res.json({ status: 1, message: "success" })
                            }
                        })
                    })
                }
            } else {
                res.status(400).json({ error: 1, message: "file not recieved" })
            }
        })
    }

    getProducts = (req, res, next) => {
        db.products.findAll({}).then((data) => {
            res.json({ status: 1, data: data })
        }, (err) => this.handleErrorResponse(res, err))
    }

    searchProducts = (req, res, next) => {
        db.products.findAll({ where: { productID: { $like: '%' + req.params.productID + '%' } } }).then((data) => {
            res.json({ status: 1, data: data })
        }, (err) => this.handleErrorResponse(res, err))
    }

}

const controller = new UserController();
export default controller;