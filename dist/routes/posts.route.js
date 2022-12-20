"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _express = require("express");
const _postsController = _interopRequireDefault(require("../controllers/posts.controller"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let PostsRoute = class PostsRoute {
    initializeRoutes() {
        this.router.get(`${this.path}/all`, this.postsController.getPosts);
        this.router.post(`${this.path}/create`, this.postsController.createPost);
        this.router.get(`${this.path}/:id`, this.postsController.getPostById);
    }
    constructor(){
        this.path = "/posts";
        this.router = (0, _express.Router)();
        this.postsController = new _postsController.default();
        this.initializeRoutes();
    }
};
const _default = PostsRoute;

//# sourceMappingURL=posts.route.js.map