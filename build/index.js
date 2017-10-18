"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const syslogd = require("syslogd");
const logger_1 = require("./common/logger");
const syslog_1 = require("./models/syslog");
class Application {
    constructor() {
        this.logPort = Number(process.env.LOG_PORT || 514);
        this.syslogDaemon = syslogd(data => this.handleLogData(data));
        this.startup();
    }
    static bootstrap() {
        return new Application();
    }
    async handleLogData(data) {
        data.time = moment(data.time).toDate();
        await syslog_1.default.create(data);
    }
    startup() {
        this.syslogDaemon.listen(this.logPort, () => console.log('123'));
        logger_1.default.info(`syslogd startup on ${this.logPort}`);
    }
}
Application.bootstrap();
