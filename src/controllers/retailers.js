import BaseAPIController from "./BaseAPIController";
import db from '../db.js'
export class retailersController extends BaseAPIController {

    createRetailers = (req, res, next) => {
        db.retailers.create(req.body).then((data) => {
            res.json({ status: 1, data: data })
        }, (err) => this.handleErrorResponse(res, err))
    }

    getRetailers = (req, res, next) => {
        db.retailers.findAll({}).then((data) => {
            res.json({ status: 1, data: data })
        }, (err) => this.handleErrorResponse(res, err))
    }

    updateRetailers = (req, res, next) => {
        db.retailers.update(req.body, { where: { id: req.body.id } }).then((response) => {
            res.json({ status: 1, data: response })
        }, (err) => this.handleErrorResponse(res, err))
    }

    deleteRetailers = (req, res, next) => {
        db.retailers.destroy({ where: { id: req.params.id } }).then((response) => {
            res.json({ status: 1, data: response })
        }, (err) => this.handleErrorResponse(res, err))
    }
}

const controller = new retailersController();
export default controller;