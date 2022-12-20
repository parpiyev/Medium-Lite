"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _cookieParser = _interopRequireDefault(require("cookie-parser"));
const _express = _interopRequireDefault(require("express"));
const _config = require("./config");
const _errorMiddleware = _interopRequireDefault(require("./middlewares/error.middleware"));
const _logger = require("./utils/logger");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let App = class App {
    listen() {
        this.app.listen(this.port, ()=>{
            _logger.logger.info(`=================================`);
            _logger.logger.info(`======= ENV: ${this.env} =======`);
            _logger.logger.info(`🚀 App listening on the port ${this.port}`);
            _logger.logger.info(`=================================`);
        });
    }
    getServer() {
        return this.app;
    }
    initializeMiddlewares() {
        this.app.use(_express.default.json());
        this.app.use(_express.default.urlencoded({
            extended: true
        }));
        this.app.use((0, _cookieParser.default)());
    }
    initializeRoutes(routes) {
        routes.forEach((route)=>{
            this.app.use("/", route.router);
        });
    }
    initializeSwagger() {
        const options = {
            swaggerDefinition: {
                info: {
                    title: "REST API",
                    version: "1.0.0",
                    description: "Example docs"
                }
            },
            apis: [
                "swagger.yaml"
            ]
        };
    }
    initializeErrorHandling() {
        this.app.use(_errorMiddleware.default);
    }
    constructor(routes){
        this.app = (0, _express.default)();
        this.env = _config.NODE_ENV || "development";
        this.port = _config.PORT || 5000;
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeSwagger();
        this.initializeErrorHandling();
    }
};
const _default = App;

//# sourceMappingURL=app.js.map