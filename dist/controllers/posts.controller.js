"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>PostController
});
const _postsService = _interopRequireDefault(require("../services/posts.service"));
const _catchAsync = _interopRequireDefault(require("../utils/catchAsync"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let PostController = class PostController {
    constructor(){
        this.postsService = new _postsService.default();
        this.getPosts = (0, _catchAsync.default)(async (req, res, next)=>{
            const findAllPostData = await this.postsService.findAllPost();
            res.status(200).json({
                data: findAllPostData,
                message: "findAll"
            });
        });
        this.getPostById = (0, _catchAsync.default)(async (req, res, next)=>{
            const findOnePostData = await this.postsService.findOnePost("id", req.params.id);
            res.status(200).json({
                data: findOnePostData,
                message: "findOne"
            });
        });
        this.createPost = (0, _catchAsync.default)(async (req, res, next)=>{
            const createPostData = await this.postsService.createPost(req.body);
            res.status(201).json({
                data: createPostData,
                message: "created"
            });
        });
    }
};

//# sourceMappingURL=posts.controller.js.map