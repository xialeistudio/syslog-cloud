"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const syslogd = require("syslogd");
const logger_1 = require("./common/logger");
const syslog_1 = require("./models/syslog");
(async () => {
    // syslogd
    const logPort = Number(process.env.LOG_PORT || 514);
    syslogd(async (data) => {
        data.time = moment(data.time).toDate();
        await syslog_1.default.create(data);
        logger_1.default.info(data.address, data.msg);
    }).listen(logPort, () => logger_1.default.info(`syslogd startup on ${logPort}`));
})();
