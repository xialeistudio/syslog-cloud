"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const database_1 = require("../common/database");
exports.default = database_1.default.define('admin', {
    id: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER },
    username: { allowNull: false, type: Sequelize.STRING(20), comment: '用户名', unique: true },
    password: { allowNull: false, type: Sequelize.CHAR(32), comment: '密码' },
}, {
    underscored: true,
    tableName: 's_admin',
});
