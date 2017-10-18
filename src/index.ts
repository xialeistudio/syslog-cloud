import * as moment from 'moment';
import * as syslogd from 'syslogd';
import logger from './common/logger';
import Syslog from './models/syslog';

class Application {
  public static bootstrap() {
    return new Application();
  }

  private logPort = Number(process.env.LOG_PORT || 514);
  private syslogDaemon: syslogd.Daemon;

  constructor() {
    this.syslogDaemon = syslogd(data => this.handleLogData(data));
    this.startup();
  }

  private async handleLogData(data: syslogd.Data) {
    data.time = moment(data.time).toDate();
    await Syslog.create(data);
  }

  private startup() {
    this.syslogDaemon.listen(this.logPort, () => logger.info(`syslogd startup on ${this.logPort}`));
  }
}

Application.bootstrap();
