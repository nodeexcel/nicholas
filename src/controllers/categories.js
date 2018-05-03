import BaseAPIController from "./BaseAPIController";
import provideUser from "../providers/user";
import db from '../db.js'
export class UserController extends BaseAPIController {

    createCategory = (req, res, next) => {
        provideUser.categories(req.checkBody, req.body, req.getValidationResult()).then((body) => {
            db.categories.create(req.body).then((data) => {
                res.json({ status: 1, data: data })
            }, (err) => this.handleErrorResponse(res, err))
        }, (err) => this.handleErrorResponse(res, err))
    }

    getAllCategory = (req, res, next) => {
        db.categories.findAll({}).then((data) => {
            res.json({ status: 1, data: data })
        }, (err) => this.handleErrorResponse(res, err))
    }

    updateCategory = (req, res, next) => {
        db.categories.update(req.body, { where: { id: req.body.id } }).then((response) => {
            res.json({ status: 1, data: response })
        }, (err) => this.handleErrorResponse(res, err))
    }

    deleteCategory = (req, res, next) => {
        db.categories.destroy({ where: { id: req.params.id } }).then((response) => {
            res.json({ status: 1, data: response })
        }, (err) => this.handleErrorResponse(res, err))
    }
}

const controller = new UserController();
export default controller;