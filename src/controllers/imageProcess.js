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

        let form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            fs.readFile(files.file.path, function(err, data) {
                let myDir = __dirname + "/files";
                if (!fs.existsSync(myDir)) {
                    fs.mkdirSync(myDir);
                }
                let directory = '';
                let zip = new AdmZip(data);
                let zipEntries = zip.getEntries(); // 
                zip.extractAllTo(myDir, true);
                zipEntries.forEach(function(zipEntry, key) {
                    // console.log(zipEntry.toString('utf8'), "entries", key)
                    if (!zipEntry.isDirectory) {
                        if (zipEntry.name) {
                            let kraken = new Kraken({
                                "api_key": "ba861f2d7b7e398cefeb106ecdce58d7",
                                "api_secret": "1a61f223803ed78b6cdd429511215aa3a6e82607"
                            });
                            let params = {
                                url: `https://www.google.co.in/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png`,
                                wait: true,
                                lossy: true
                            };
                            console.log(params)
                            kraken.url(params, function(status) {
                                if (status.success) {
                                    console.log("Success. Optimized image URL: ", status.kraked_url);
                                    cloudinary.uploader.upload(status.kraked_url, function(result) {
                                        console.log(result, "llllllllllllllllllllllllllllllllllllllll")
                                    });
                                } else {
                                    console.log("Fail. Error message: ", status.message);
                                }
                            });
                        }
                    } else {
                        directory = zipEntry.entryName
                    }
                    if (key == zipEntries.length - 1) {
                        rmdir(myDir + '/' + directory, function(error, data) {
                            console.log(err)
                        });
                    }
                });

            })
        })
    }

}

const controller = new UserController();
export default controller;