"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _default = (fn)=>{
    return (req, res, next)=>{
        fn(req, res, next).catch(next);
    };
};

//# sourceMappingURL=catchAsync.js.map