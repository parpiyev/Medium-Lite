"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>UserController
});
const _usersService = _interopRequireDefault(require("../services/users.service"));
const _catchAsync = _interopRequireDefault(require("../utils/catchAsync"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let UserController = class UserController {
    constructor(){
        this.usersService = new _usersService.default();
        this.getUsers = (0, _catchAsync.default)(async (req, res, next)=>{
            const findAllUserData = await this.usersService.findAllUser();
            res.status(200).json({
                data: findAllUserData,
                message: "findAll"
            });
        });
        this.getUserById = (0, _catchAsync.default)(async (req, res, next)=>{
            const findOneUserData = await this.usersService.findOneUser("id", req.params.id);
            res.status(200).json({
                data: findOneUserData,
                message: "findOne"
            });
        });
        this.createUser = (0, _catchAsync.default)(async (req, res, next)=>{
            const createUserData = await this.usersService.createUser(req.body);
            res.status(201).json({
                data: createUserData,
                message: "created"
            });
        });
    }
};

//# sourceMappingURL=users.controller.js.map