"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>PostsService
});
const _httpException = require("../exceptions/HttpException");
const _util = require("../utils/util");
const _promises = require("fs/promises");
const _uuid = require("uuid");
const _usersService = _interopRequireDefault(require("./users.service"));
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
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
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
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
const posts = require("../databases/posts.json");
let PostsService = class PostsService {
    findAllPost() {
        return Object.values(this.posts);
    }
    async findOnePost(key = "id", value) {
        if ((0, _util.isEmpty)(key) || (0, _util.isEmpty)(value)) throw new _httpException.HttpException(400, "findOnePost Params is empty");
        let post;
        if (key == "id") {
            var _this_posts_value;
            post = this.posts[value];
            ((_this_posts_value = this.posts[value]) === null || _this_posts_value === void 0 ? void 0 : _this_posts_value.viewsAmount) ? this.posts[value].viewsAmount++ : this.posts[value].viewsAmount = 1;
            const path = __dirname + "/../databases/posts.json";
            await (0, _promises.writeFile)(path, JSON.stringify(this.posts));
        } else {
            for(let i = 0; i < this.posts.length; i++){
                if (this.posts[i][key] == value) {
                    post = this.posts[i];
                }
            }
        }
        if (!post) throw new _httpException.HttpException(409, "Post doesn't exist");
        post.author = await this.usersService.findOneUser("id", post.author);
        return post;
    }
    async createPost(postData) {
        if ((0, _util.isEmpty)(postData)) throw new _httpException.HttpException(400, "PostData is empty");
        const id = (0, _uuid.v4)();
        this.posts[`${id}`] = _objectSpreadProps(_objectSpread({
            id
        }, postData), {
            createdAt: new Date()
        });
        const path = __dirname + "/../databases/posts.json";
        await (0, _promises.writeFile)(path, JSON.stringify(this.posts));
        return this.posts[0];
    }
    constructor(){
        this.posts = posts;
        this.usersService = new _usersService.default();
    }
};

//# sourceMappingURL=posts.service.js.map