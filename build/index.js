"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const session = require("koa-session");
const moment = require("moment");
const syslogd = require("syslogd");
const logger_1 = require("./common/logger");
const syslog_1 = require("./models/syslog");
const error_handler_1 = require("./middleware/error-handler");
const api_1 = require("./routes/api");
class Application {
    constructor() {
        this.logPort = Number(process.env.LOG_PORT || 514);
        this.httpPort = Number(process.env.HTTP_PORT || 7001);
        this.httpHost = process.env.HTTP_HOST || '0.0.0.0';
        this.syslogDaemon = syslogd(data => this.handleLogData(data));
        this.koa = new Koa();
        this.configuration();
        this.startup();
    }
    static bootstrap() {
        return new Application();
    }
    async handleLogData(data) {
        data.time = moment(data.time).toDate();
        await syslog_1.default.create(data);
        logger_1.default.info(data.address, data.msg);
    }
    startup() {
        this.syslogDaemon.listen(this.logPort);
        logger_1.default.info(`syslogd startup on udp:${this.logPort}`);
        const server = this.koa.listen(this.httpPort, this.httpHost, () => {
            logger_1.default.info(`http startup on ${server.address().address}:${server.address().port}`);
        });
    }
    configuration() {
        this.koa.use(error_handler_1.default);
        this.koa.use(session(this.koa));
        this.koa.use(api_1.default.routes()).use(api_1.default.allowedMethods());
    }
}
Application.bootstrap();
