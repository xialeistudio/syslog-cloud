"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const config_1 = require("../config");
exports.default = new Sequelize(config_1.database.database, config_1.database.username, config_1.database.password, config_1.database.options);
