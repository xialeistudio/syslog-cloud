import * as Koa from 'koa';

export default async function(ctx: Koa.Context, next: () => void) {
  if (ctx.url.indexOf('/login') === -1 && !ctx.session.adminId) {
    ctx.throw(401);
  }
  await next();
}
