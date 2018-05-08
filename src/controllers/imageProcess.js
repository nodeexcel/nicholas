import BaseAPIController from "./BaseAPIController";
import db from '../db.js'
import AdmZip from 'adm-zip';
import fs from "fs";
import formidable from "formidable";
import Kraken from "kraken";
import cloudinary from 'cloudinary';
import rmdir from 'rimraf';
cloudinary.config({
    cloud_name: 'dtgbbrxs0',
    api_key: '296789734731114',
    api_secret: 'FNqRNKXgicTjVfaEj39DjsDDBEY'
});
export class UserController extends BaseAPIController {
    uploadImage = (req, res, next) => {
        let kraken = new Kraken({
            "api_key": "ba861f2d7b7e398cefeb106ecdce58d7",
            "api_secret": "1a61f223803ed78b6cdd429511215aa3a6e82607"
        });
        let FinalResult = []
        let errors = []
        let form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            if (files && files.file.type != 'application/zip') {
                res.status(400).json({ error: 1, message: "please upload zip file" })
            } else {
                fs.readFile(files.file.path, function(err, data) {
                    let myDir = __dirname + "/files";
                    if (!fs.existsSync(myDir)) {
                        fs.mkdirSync(myDir);
                    }
                    let directory = '';
                    let zip = new AdmZip(data);
                    let zipEntries = zip.getEntries();
                    zip.extractAllTo(myDir, true);
                    zipEntries.forEach(function(zipEntry, key) {
                        let imageFlag = false;

                        // console.log(zipEntry.toString('utf8'), "entries", key)
                        if (!zipEntry.isDirectory) {
                            if (zipEntry.name) {
                                let productID = zipEntry.name.split(".");
                                console.log(zipEntry.name, productID[0])
                                db.products.findOne({ where: { productID: productID[0] } }).then((product) => {
                                    let params = {}
                                    if (product) {
                                        let params = {
                                            url: `http://${req.hostname}:5001/controllers/files/${zipEntry.entryName}`,
                                            wait: true,
                                            lossy: true
                                        };
                                        // errors.push(zipEntry.name)
                                        // if (key == zipEntries.length - 1) {
                                        //     res.json({ status: 1, message: "success", data: FinalResult, errors: errors })
                                        //     //     rmdir(myDir + '/' + directory, function(error, data) {
                                        //     //         console.log(err)
                                        //     //     });
                                        // }
                                    }


                                    kraken.url(params, function(status) {
                                        if (status.success) {
                                            console.log("Success. Optimized image URL: ", status.kraked_url);
                                            cloudinary.uploader.upload(status.kraked_url, function(result) {
                                                FinalResult.push(result.url)
                                                db.products.update({ ImageFullsizeURL: result.url }, { where: { productID: productID[0] } }).then((product) => {
                                                    console.log(product, "ookk")
                                                })
                                                if (result) {
                                                    imageFlag = true
                                                    if (key == zipEntries.length - 1) {
                                                        res.json({ status: 1, message: "success", data: FinalResult, errors: errors })
                                                    }

                                                    //     rmdir(myDir + '/' + directory, function(error, data) {
                                                    //         console.log(err)
                                                    //     });
                                                }
                                            });
                                        } else {
                                            console.log("Fail. Error message: ", status.message);
                                            if (imageFlag && key == zipEntries.length - 1) {
                                                errors.push(zipEntry.name)
                                                res.json({ status: 1, message: "success", data: FinalResult, errors: errors })
                                            }
                                        }
                                    });


                                })
                            }
                        } else {
                            directory = zipEntry.entryName
                        }

                    });
                })
            }


        })
    }

}

const controller = new UserController();
export default controller;