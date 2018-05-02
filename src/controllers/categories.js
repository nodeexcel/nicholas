import BaseAPIController from "./BaseAPIController";
import provideUser from "../providers/user";
import db from '../db.js'
export class UserController extends BaseAPIController {

    createCatogory = (req, res, next) => {
        provideUser.categories(req.checkBody, req.body, req.getValidationResult()).then((body) => {
            db.categories.create(req.body).then((data) => {
                res.json({ status: 1, data: data })
            }, (err) => this.handleErrorResponse(res, err))
        }, (err) => this.handleErrorResponse(res, err))
    }

    getAllCatogory = (req, res, next) => {
        db.categories.findAll({}).then((data) => {
            res.json({ status: 1, data: data })
        }, (err) => this.handleErrorResponse(res, err))
    }
}

const controller = new UserController();
export default controller;