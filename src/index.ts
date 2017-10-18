import * as Koa from 'koa';
import * as session from 'koa-session';
import * as moment from 'moment';
import * as syslogd from 'syslogd';
import logger from './common/logger';
import Syslog from './models/syslog';

import errorHandler from './middleware/error-handler';
import apiRoute from './routes/api';

class Application {
  public static bootstrap() {
    return new Application();
  }

  private logPort = Number(process.env.LOG_PORT || 514);
  private httpPort = Number(process.env.HTTP_PORT || 7001);
  private httpHost = process.env.HTTP_HOST || '0.0.0.0';
  private syslogDaemon = syslogd(data => this.handleLogData(data));
  private koa = new Koa();

  constructor() {
    this.configuration();
    this.startup();
  }

  private async handleLogData(data: syslogd.Data) {
    data.time = moment(data.time).toDate();
    await Syslog.create(data);
    logger.info(data.address, data.msg);
  }

  private startup() {
    this.syslogDaemon.listen(this.logPort);
    logger.info(`syslogd startup on udp:${this.logPort}`);
    const server = this.koa.listen(this.httpPort, this.httpHost, () => {
      logger.info(`http startup on ${server.address().address}:${server.address().port}`);
    });
  }

  private configuration() {
    this.koa.keys = ['xialeistudio'];
    this.koa.use(errorHandler);
    this.koa.use(session(this.koa));
    this.koa.use(apiRoute.routes()).use(apiRoute.allowedMethods());
  }
}

Application.bootstrap();
