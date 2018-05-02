let config;
let db;
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
}
export default {
    config,
    db
}