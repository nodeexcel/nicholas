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
app.set('view engine', 'jade');
app.use(cors({
    exposedHeaders: environment.config.corsHeaders
}));
var corsOptions = {
    origin: true,
    methods: ['GET, POST, OPTIONS, PUT, PATCH, DELETE'],
    allowedHeaders: ['Origin', 'Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Link'],
    credentials: true
};
app.use(cors(corsOptions));

app.use(bodyParser.json({
    limit: environment.config.bodyLimit
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname))
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