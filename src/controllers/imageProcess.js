import BaseAPIController from "./BaseAPIController";
import db from '../db.js'
var AdmZip = require('adm-zip');
import fs from "fs";
import formidable from "formidable";
var Kraken = require("kraken");

export class UserController extends BaseAPIController {

    uploadImage = (req, res, next) => {
        var kraken = new Kraken({
            "api_key": "ba861f2d7b7e398cefeb106ecdce58d7",
            "api_secret": "1a61f223803ed78b6cdd429511215aa3a6e82607"
        });
        console.log("]]]]]]]]]]]]]]]")
        var params = {
            url: `http://${req.hostname}:5001/msd1.jpg`,
            wait: true,
            lossy: true
        };
        console.log(params)

        kraken.url(params, function(status) {
            console.log("=======================================")
            if (status.success) {
                console.log("Success. Optimized image URL: %s", status.kraked_url);
            } else {
                console.log("Fail. Error message: %s", status.message);
            }
        });

        // reading archives
        // console.log("=======================")
        // let form = new formidable.IncomingForm();
        // form.parse(req, function(err, fields, files) {
        //     // let new_path = path.join(__dirname, files.file.name);
        //     fs.readFile(files.file.path, function(err, data) {
        //         // response.pipe(file);
        //         // console.log(data.toString('utf8'), "kkkkkkkkkkkkkkkkkkkkk")
        //     })
        // })
        // var zip = new AdmZip("/var/www/html/msdpics.zip");
        // var zipEntries = zip.getEntries(); // an array of ZipEntry records
        // zipEntries.forEach(function(zipEntry) {
        //     if (!zipEntry.isDirectory) {
        //         // console.log(zipEntry.toString(), "============================"); // outputs zip entries information
        //         console.log(zipEntry.name, "============================"); // outputs zip entries information
        //     }
        // });

        // zip.extractAllTo( /*target path*/ "/home/etech", /*overwrite*/ true);
        // fs.unlink('/home/etech/msdpics', function() {
        //     console.log("success");
        //     res.json("success")
        // });

    }

}

const controller = new UserController();
export default controller;