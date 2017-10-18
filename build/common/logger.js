"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = process.env.NODE_ENV === 'development' ? 'level' : 'info';
exports.default = logger;
