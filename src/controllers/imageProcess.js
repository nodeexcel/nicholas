import BaseAPIController from "./BaseAPIController";
import db from '../db.js'
import AdmZip from 'adm-zip';
import fs from "fs";
import formidable from "formidable";
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
        let errors = []
        let form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {

            if (files.file) {
                if (files.file['name'].substr(files.file['name'].lastIndexOf('.') + 1).toLowerCase() != 'zip') {
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
                            if (!zipEntry.isDirectory) {
                                if (zipEntry.name) {
                                    let productID = zipEntry.name.split(".");
                                    productIDS.push({ Pid: productID[0], entry: zipEntry.entryName })
                                }
                            } else {
                                directory = zipEntry.entryName
                            }
                        });
                        let validImages = []
                        let errors = []
                        db.products.findAll({}).then((product) => {
                            _.map(product, (val, key) => {
                                _.filter(productIDS, function(index) {
                                    // console.log(index, val.ProductID, "kokokoko")
                                    if (index.Pid == val.ProductID) {
                                        validImages.push(index)
                                    }
                                });
                            });
                            _.map(product, (val, key) => {
                                _.remove(productIDS, function(index) {
                                    return (index.Pid == val.ProductID)
                                })
                            })
                            console.log(validImages, "errorsssssssssssssssss", productIDS)

                            cloudImageUrls(validImages, directory, function(final_response) {
                                res.json({ status: 1, data: final_response, errors: productIDS })
                            })

                            function cloudImageUrls(validImages, directory, callback) {
                                if (validImages.length) {
                                    let image = validImages.splice(0, 1)[0];
                                    let imageUrl = `http://${req.hostname}:5001/controllers/files/${image.entry}`;
                                    cloudinary.uploader.upload(imageUrl, function(result) {
                                        console.log(result.url)
                                        if (result) {
                                            finalImageUrls.push({ imageUrl: result.url, ProductId: image.Pid })
                                            db.products.update({ ImageFullsizeURL: result.url }, { where: { productID: image.Pid } }).then((updatedImages) => {
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
                                    callback(finalImageUrls)
                                }
                            }
                        })

                    })
                }
            } else {
                res.status(400).json({ error: 1, message: "file not recieved" })
            }
        })
    }


    uploadMp4 = (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            if (files.file) {
                if (files.file['name'].substr(files.file['name'].lastIndexOf('.') + 1).toLowerCase() != 'mp4') {
                    res.status(400).json({ error: 1, message: "please upload csv file" })
                } else {
                    fs.readFile(files.file.path, function(err, data) {
                        let myDir = __dirname + "/files";
                        if (!fs.existsSync(myDir)) {
                            fs.mkdirSync(myDir);
                        }
                        fs.writeFile(myDir + `/${files.file.name}`, data, function(err, resp) {
                            if (err) {
                                console.log(err)
                            } else {
                                let mp4Url = `http://${req.hostname}:5001/controllers/files/${image.entry}`;
                                console.log("Successfully Written to File.");
                                cloudinary.v2.uploader.upload(mp4Url, function(result) {
                                    console.log(result, "ooooooooooooooooooo")
                                })
                            }
                        });

                    })
                }
            }
        })
    }

}

const controller = new UserController();
export default controller;