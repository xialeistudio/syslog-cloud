"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function default_1(ctx, next) {
    try {
        await next();
    }
    catch (e) {
        ctx.body = {
            errcode: e.status || 500,
            errmsg: e.message,
        };
    }
}
exports.default = default_1;
