"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
function md5(data) {
    const m = crypto.createHash('md5');
    m.update(data);
    return m.digest('hex');
}
exports.md5 = md5;
