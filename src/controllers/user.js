import BaseAPIController from "./BaseAPIController";
import provideUser from "../providers/user";
import db from '../db.js'
export class UserController extends BaseAPIController {

    createUser = (req, res, next) => {
        // provideUser.createUser(req.checkBody, req.body, req.getValidationResult()).then((body) => {
        db.users.create(req.body).then((data) => {
            res.json({ status: 1, data: data })
        }, (err) => this.handleErrorResponse(res, err))
        // }, (err) => this.handleErrorResponse(res, err))
    }

    updateUser = (req, res, next) => {
        db.users.update(req.body, { where: { id: req.body.id } }).then((response) => {
            res.json({ status: 1, data: response })
        }, (err) => this.handleErrorResponse(res, err))
    }

    deleteUser = (req, res, next) => {
        db.users.destroy({ where: { id: req.params.id } }).then((response) => {
            res.json({ status: 1, data: response })
        }, (err) => this.handleErrorResponse(res, err))
    }

}

const controller = new UserController();
export default controller;