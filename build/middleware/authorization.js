"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function default_1(ctx, next) {
    if (ctx.url.indexOf('/login') === -1 && !ctx.session.adminId) {
        ctx.throw(401);
    }
    await next();
}
exports.default = default_1;
