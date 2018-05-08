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
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
        let form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            console.log(files, "kkkkkkkkkkkkkkkkkkkkkkkkkkk")
            // let new_path = path.join(__dirname, files.file.name);
            fs.readFile(files.file.path, function(err, data) {
                var csv = data.toString('utf8')
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
                var arr = []
                db.products.findAll({}).then((resp) => {
                    arr = resp.filter(function(item) {
                        return result.indexOf(item.id) === -1;
                    });
                    // _.map(result, (val, key) => {
                    //     _.remove(resp, function(index) {
                    //         return (index.ProductID == val.ProductID)
                    //     })
                    // })
                    console.log(arr, "==================================================")

                })

                // let check = _.find(data.answers, function(get) { return get.Q_id == val._id; });

                _.forEach(result, (val, key) => {
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
        })
    }

    getProducts = (req, res, next) => {
        db.products.findAll({}).then((data) => {
            res.json({ status: 1, data: data })
        }, (err) => this.handleErrorResponse(res, err))
    }

}

const controller = new UserController();
export default controller;