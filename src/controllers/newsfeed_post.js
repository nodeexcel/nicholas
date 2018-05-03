import BaseAPIController from "./BaseAPIController";
import provideUser from "../providers/user";
import db from '../db.js'
export class newsfeed_postController extends BaseAPIController {

    createNewsfeedPost = (req, res, next) => {
        db.newsfeed_post.create(req.body).then((data) => {
            res.json({ status: 1, data: data })
        }, (err) => this.handleErrorResponse(res, err))
    }

    getNewsfeedPost = (req, res, next) => {
        db.newsfeed_post.findAll({}).then((data) => {
            res.json({ status: 1, data: data })
        }, (err) => this.handleErrorResponse(res, err))
    }

    updateNewsfeedPost = (req, res, next) => {
        db.newsfeed_post.update(req.body, { where: { id: req.body.id } }).then((response) => {
            res.json({ status: 1, data: response })
        }, (err) => this.handleErrorResponse(res, err))
    }

    deleteNewsfeedPost = (req, res, next) => {
        db.newsfeed_post.destroy({ where: { id: req.params.id } }).then((response) => {
            res.json({ status: 1, data: response })
        }, (err) => this.handleErrorResponse(res, err))
    }

}

const controller = new newsfeed_postController();
export default controller;