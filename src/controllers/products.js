import BaseAPIController from "./BaseAPIController";
import provideUser from "../providers/user";
import db from '../db.js';
import _ from "lodash";


export class UserController extends BaseAPIController {

    createProducts = (req, res, next) => {
        db.products.findAll({}).then((resp) => {
            var test = _.map(req.body.products, (val, key) => {
                return _.remove(resp, function(index) {
                    return (index.ProductID == val.ProductID)
                })
            })
            // console.log(resp, "oooooooo", resp.length)
            // db.products.destroy({ where: resp }).then((result) => {
            //     console.log(result)
            // })
        })
        _.forEach(req.body.products, (val, key) => {
            db.products.findOne({ where: { ProductID: val.ProductID } }).then((product) => {
                if (product) {
                    db.products.update(val, { where: { ProductID: val.ProductID } }).then((data) => {
                        console.log(data)
                    })
                } else {
                    db.products.create(val).then((data) => {
                        console.log(data)
                    })
                }
            })
            if (key == resp.length - 1) {
                res.json({ status: 1, message: success })
            }
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