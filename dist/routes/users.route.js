"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _express = require("express");
const _usersController = _interopRequireDefault(require("../controllers/users.controller"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let UsersRoute = class UsersRoute {
    initializeRoutes() {
        this.router.get(`${this.path}/all`, this.usersController.getUsers);
        this.router.post(`${this.path}/create`, this.usersController.createUser);
        this.router.get(`${this.path}/:id`, this.usersController.getUserById);
    }
    constructor(){
        this.path = "/users";
        this.router = (0, _express.Router)();
        this.usersController = new _usersController.default();
        this.initializeRoutes();
    }
};
const _default = UsersRoute;

//# sourceMappingURL=users.route.js.map