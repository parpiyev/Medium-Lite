"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>UsersService
});
const _httpException = require("../exceptions/HttpException");
const _util = require("../utils/util");
const _promises = require("fs/promises");
const _bcrypt = require("bcrypt");
const _uuid = require("uuid");
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
const users = require("../databases/users.json");
let UsersService = class UsersService {
    findAllUser() {
        return Object.values(this.users);
    }
    async findOneUser(key = "id", value, isChecked = true) {
        if ((0, _util.isEmpty)(key) || (0, _util.isEmpty)(value)) throw new _httpException.HttpException(400, "findOneUser Params is empty");
        let user;
        if (key == "id") {
            user = this.users[value];
        } else {
            const users = Object.values(this.users);
            for(let i = 0; i < users.length; i++){
                if (users[i][key] == value) user = users[i];
            }
        }
        if (!user && isChecked) throw new _httpException.HttpException(409, "User doesn't exist");
        return user;
    }
    async createUser(userData) {
        if ((0, _util.isEmpty)(userData)) throw new _httpException.HttpException(400, "userData is empty");
        const findUser = await this.findOneUser("username", userData.username, false);
        if (findUser) throw new _httpException.HttpException(409, `This username ${userData.username} already exists`);
        userData.password = await (0, _bcrypt.hash)(userData.password, 10);
        const id = (0, _uuid.v4)(), path = __dirname + "/../databases/users.json";
        this.users[`${id}`] = _objectSpread({
            id
        }, userData);
        await (0, _promises.writeFile)(path, JSON.stringify(this.users));
        return this.users[`${id}`];
    }
    constructor(){
        this.users = users;
    }
};

//# sourceMappingURL=users.service.js.map