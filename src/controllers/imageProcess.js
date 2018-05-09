import BaseAPIController from "./BaseAPIController";
import db from '../db.js'
import AdmZip from 'adm-zip';
import fs from "fs";
import formidable from "formidable";
import Kraken from "kraken";
import cloudinary from 'cloudinary';
import rmdir from 'rimraf';
import _ from "lodash";

cloudinary.config({
    cloud_name: 'dtgbbrxs0',
    api_key: '296789734731114',
    api_secret: 'FNqRNKXgicTjVfaEj39DjsDDBEY'
});
export class UserController extends BaseAPIController {
    uploadImage = (req, res, next) => {
        let finalImageUrls = [];
        let kraken = new Kraken({
            "api_key": "ba861f2d7b7e398cefeb106ecdce58d7",
            "api_secret": "1a61f223803ed78b6cdd429511215aa3a6e82607"
        });
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
                    let productIDS = []
                    zipEntries.forEach(function(zipEntry, key) {
                        let imageFlag = false;

                        // console.log(zipEntry.toString('utf8'), "entries", key)
                        if (!zipEntry.isDirectory) {
                            if (zipEntry.name) {
                                let productID = zipEntry.name.split(".");
                                productIDS.push(productID[0])
                                console.log(productIDS, key)
                            }
                        } else {
                            directory = zipEntry.entryName
                        }
                    });
                    let validImages = []
                    db.products.findAll({}).then((product) => {
                        _.map(product, (val, key) => {
                            _.filter(productIDS, function(index) {
                                // console.log(index, val.ProductID, "kokokoko")
                                if (index == val.ProductID) {
                                    validImages.push(index)
                                } else {
                                    console.log("false")
                                }
                            });
                        });
                        let errors = _.difference(productIDS, validImages);
                        console.log(validImages, "kokokokokokoooooooooo", errors)
                        cloudImageUrls(validImages, directory, directory, function(final_response) {
                            res.json({ status: 1, data: final_response, errors: errors })
                        })
                    })

                    function cloudImageUrls(validImages, directory, callback) {
                        // console.log()
                        let image = validImages.splice(0, 1)[0];
                        console.log(image, "oppppppppp")
                        // finalImageUrls.push(image)
                        let params = {
                            url: `http://${req.hostname}:5001/controllers/files/${directory}`,
                            wait: true,
                            lossy: true
                        };

                        kraken.url(params, function(status) {
                            if (status.success) {
                                console.log("Success. Optimized image URL: ", status.kraked_url);
                                cloudinary.uploader.upload(status.kraked_url, function(result) {
                                    if (result) {
                                        finalImageUrls.push(result.url)
                                        db.products.update({ ImageFullsizeURL: result.url }, { where: { productID: image } }).then((updatedImages) => {
                                            console.log(updatedImages)
                                        })
                                        if (validImages.length) {
                                            cloudImageUrls(validImages, directory, callback)
                                        } else {
                                            callback(finalImageUrls)
                                        }
                                    }
                                    //     //     rmdir(myDir + '/' + directory, function(error, data) {
                                    //     //         console.log(err)
                                    //     //     });
                                    // }
                                });
                            } else {
                                console.log("Fail. Error message: ", status.message);
                            }
                        });

                    }

                })
            }


        })
    }

}

const controller = new UserController();
export default controller;