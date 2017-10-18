import * as Koa from 'koa';

export default async function(ctx: Koa.Context, next: () => void) {
  try {
    await next();
  } catch (e) {
    ctx.body = {
      errcode: e.status || 500,
      errmsg: e.message,
    };
  }
}
