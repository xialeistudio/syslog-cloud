import * as moment from 'moment';
import * as syslogd from 'syslogd';
import logger from './common/logger';
import Syslog from './models/syslog';

(async () => {
  // syslogd
  const logPort = Number(process.env.LOG_PORT || 514);
  syslogd(async (data) => {
    data.time = moment(data.time).toDate() as any;
    await Syslog.create(data);
    logger.info(data.address, data.msg);
  }).listen(logPort, () => logger.info(`syslogd startup on ${logPort}`));
})();
