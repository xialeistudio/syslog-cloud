import * as log4js from 'log4js';

const logger = log4js.getLogger();
logger.level = process.env.NODE_ENV === 'development' ? 'level' : 'info';
export default logger;
