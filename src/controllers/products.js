import BaseAPIController from "./BaseAPIController";
import provideUser from "../providers/user";
import db from '../db.js'

export class UserController extends BaseAPIController {

    createProducts = (req, res, next) => {
        // provideUser.categories(req.checkBody, req.body, req.getValidationResult()).then((body) => {
        let form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            // let new_path = path.join(__dirname, "/uploads/", files.file.name);
            fs.readFile(files.file.path, function(err, data) {})
        })
        // }, (err) => this.handleErrorResponse(res, err))
    }
}

const controller = new UserController();
export default controller;