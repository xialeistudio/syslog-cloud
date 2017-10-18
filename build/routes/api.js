"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const Sequelize = require("sequelize");
const authorization_1 = require("../middleware/authorization");
const admin_1 = require("../models/admin");
const syslog_1 = require("../models/syslog");
const util_1 = require("../util");
const router = new Router({ prefix: '/api' });
// 检测登录
router.use(authorization_1.default);
// login
router.get('/login', async (ctx) => {
    const { username, password } = ctx.query;
    if (!username || !password) {
        ctx.throw(400);
    }
    const admin = await admin_1.default.findOne({ where: { username } });
    if (!admin || admin.password !== util_1.md5(password)) {
        ctx.throw(400);
    }
    ctx.session.adminId = admin.id;
    ctx.body = { errmsg: 'ok', errcode: 0 };
});
// count
router.get('/log/count', async (ctx) => {
    const { address, tag } = ctx.query;
    if (!address && !tag) {
        const last = await admin_1.default.findOne({ order: [['id', 'DESC']] });
        if (!last) {
            ctx.body = { count: 0 };
        }
        else {
            ctx.body = { count: last.id };
        }
        return;
    }
    const condition = {};
    if (address) {
        condition.address = address;
    }
    if (tag) {
        condition.tag = tag;
    }
    const count = await syslog_1.default.count({ where: condition });
    ctx.body = { count };
});
// list
router.get('/log/list', async (ctx) => {
    const { address, tag, page = 1, size = 10 } = ctx.query;
    const condition = {};
    if (address) {
        condition.address = address;
    }
    if (tag) {
        condition.tag = tag;
    }
    const list = await syslog_1.default.findAll({ where: condition, offset: (page - 1) * size, limit: size });
    ctx.body = list.map((item) => item.toJSON());
});
// tags
router.get('/log/tags', async (ctx) => {
    const tags = await syslog_1.default.findAll({ attributes: [[Sequelize.literal('distinct tag'), 'tag']] });
    ctx.body = tags.map((item) => item.tag);
});
router.get('/log/addresses', async (ctx) => {
    const tags = await syslog_1.default.findAll({ attributes: [[Sequelize.literal('distinct address'), 'address']] });
    ctx.body = tags.map((item) => item.address);
});
exports.default = router;
