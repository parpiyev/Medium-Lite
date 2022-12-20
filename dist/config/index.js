"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    CREDENTIALS: ()=>CREDENTIALS,
    NODE_ENV: ()=>NODE_ENV,
    PORT: ()=>PORT,
    DB_USER: ()=>DB_USER,
    DB_PASSWORD: ()=>DB_PASSWORD,
    DB_HOST: ()=>DB_HOST,
    DB_PORT: ()=>DB_PORT,
    DB_DATABASE: ()=>DB_DATABASE,
    SECRET_KEY: ()=>SECRET_KEY,
    LOG_FORMAT: ()=>LOG_FORMAT,
    LOG_DIR: ()=>LOG_DIR,
    ORIGIN: ()=>ORIGIN
});
const _dotenv = require("dotenv");
(0, _dotenv.config)({
    path: `.env.${process.env.NODE_ENV || "development"}.local`
});
const CREDENTIALS = process.env.CREDENTIALS === "true";
const { NODE_ENV , PORT , DB_USER , DB_PASSWORD , DB_HOST , DB_PORT , DB_DATABASE , SECRET_KEY , LOG_FORMAT , LOG_DIR , ORIGIN  } = process.env;

//# sourceMappingURL=index.js.map