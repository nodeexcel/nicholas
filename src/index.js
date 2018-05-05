/* eslint-disable*/
import http from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import environment from './environment';
import db from './db';
import expressValidator from "express-validator";
import glob from "glob";
import path from "path";

const app = express();
app.server = http.createServer(app);

app.use(cors());
app.use(cors({
    exposedHeaders: environment.config.corsHeaders
}));
app.use(bodyParser.json({
    limit: environment.config.bodyLimit
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname)));

app.use(expressValidator());

const initRoutes = (app) => {
    // including all routes
    glob("./routes/*.js", {
        cwd: path.resolve("./src")
    }, (err, routes) => {
        if (err) {
            console.log("Error occured including routes");
            return;
        }
        routes.forEach((routePath) => {
            require(routePath).default(app); // eslint-disable-line
        });
        console.log("included " + routes.length + " route files");
    });
};

initRoutes(app);
app.server.listen(process.env.PORT || 5001, function() {
    console.log("Started on port " + 5001);
});

export default app;