"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _app = _interopRequireDefault(require("./app"));
const _validateEnv = _interopRequireDefault(require("./utils/validateEnv"));
const _indexRoute = _interopRequireDefault(require("./routes/index.route"));
const _postsRoute = _interopRequireDefault(require("./routes/posts.route"));
const _usersRoute = _interopRequireDefault(require("./routes/users.route"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
(0, _validateEnv.default)();
const app = new _app.default([
    new _indexRoute.default(),
    new _usersRoute.default(),
    new _postsRoute.default()
]);
app.listen();

//# sourceMappingURL=server.js.map