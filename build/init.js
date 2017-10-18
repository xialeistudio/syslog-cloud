"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = require("./models/admin");
const syslog_1 = require("./models/syslog");
(async () => {
    console.time('initialize...Admin');
    await admin_1.default.sync({ force: true });
    console.timeEnd('initialize...Admin');
    console.time('initialize...Syslog');
    await syslog_1.default.sync({ force: true });
    console.timeEnd('initialize...Syslog');
    process.exit();
})();
