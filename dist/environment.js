"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = void 0;
var db = void 0;
if (process.env.ENV == "dev") {
    config = {
        "port": 8091,
        "bodyLimit": "100kb",
        "corsHeaders": ["Link"],
        "db": {
            "host": "127.0.0.1",
            "name": "nicholas",
            "password": "java@123",
            "username": "root"
        }
    };
} else {
    config = {
        "port": 8091,
        "bodyLimit": "100kb",
        "corsHeaders": ["Link"],
        "db": {
            "host": "nicholas.cs26dooygdod.us-east-2.rds.amazonaws.com",
            "name": "nicholas",
            "password": "java1234",
            "username": "root"
        }
    };
}
exports.default = {
    config: config,
    db: db
};
//# sourceMappingURL=environment.js.map