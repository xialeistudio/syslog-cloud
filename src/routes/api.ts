import * as Router from 'koa-router';
import authorize from '../middleware/authorization';
import Admin from '../models/admin';
import Syslog from '../models/syslog';
import { md5 } from '../util';

const router = new Router({ prefix: '/api' });
// 检测登录
router.use(authorize);
// login
router.get('/login', async (ctx) => {
  const { username, password } = ctx.query;
  if (!username || !password) {
    ctx.throw(400);
  }
  const admin = await Admin.findOne({ where: { username } });
  if (!admin || admin.password !== md5(password)) {
    ctx.throw(400);
  }
  ctx.session.adminId = admin.id;
  ctx.body = { errmsg: 'ok', errcode: 0 };
});
// count
router.get('/log/count', async (ctx) => {
  const { address, tag } = ctx.query;
  if (!address && !tag) {
    const last = await Admin.findOne({ order: [['id', 'DESC']] });
    if (!last) {
      ctx.body = { count: 0 };
    } else {
      ctx.body = { count: last.id };
    }
    return;
  }
  const condition: any = {};
  if (address) {
    condition.address = address;
  }
  if (tag) {
    condition.tag = tag;
  }
  const count = await Syslog.count({ where: condition });
  ctx.body = { count };
});
// list
router.get('/log/list', async (ctx) => {
  const { address, tag, page = 1, size = 10 } = ctx.query;
  const condition: any = {};
  if (address) {
    condition.address = address;
  }
  if (tag) {
    condition.tag = tag;
  }
  const list = await Syslog.findAll({ where: condition, offset: (page - 1) * size, limit: size });
  ctx.body = list.map((item) => item.toJSON());
});
// tags
router.get('/log/tags', async (ctx) => {
  const tags = await Syslog.findAll({ distinct: true, attributes: ['tag'] });
  ctx.body = tags.map((item) => item.toJSON());
});

router.get('/log/addresses', async (ctx) => {
  const tags = await Syslog.findAll({ distinct: true, attributes: ['address'] });
  ctx.body = tags.map((item) => item.toJSON());
});

export default router;
