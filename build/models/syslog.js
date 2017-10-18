"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const database_1 = require("../common/database");
exports.default = database_1.default.define('syslog', {
    id: { primaryKey: true, autoIncrement: true, type: Sequelize.BIGINT },
    facility: { allowNull: false, type: 'TINYINT(1)' },
    severity: { allowNull: false, type: 'TINYINT(1)' },
    tag: { allowNull: false, type: Sequelize.STRING(20) },
    time: { allowNull: false, type: Sequelize.DATE },
    hostname: { allowNull: false, type: Sequelize.STRING(100) },
    address: { allowNull: false, type: Sequelize.STRING(100) },
    family: { allowNull: false, type: Sequelize.CHAR(6) },
    port: { allowNull: false, type: 'SMALLINT UNSIGNED' },
    size: { allowNull: false, type: 'SMALLINT UNSIGNED' },
    msg: { allowNull: false, type: Sequelize.TEXT },
}, {
    underscored: true,
    tableName: 's_syslog',
    timestamps: false,
    indexes: [
        { fields: ['address', 'tag'] },
        { fields: ['address', 'time'] },
    ],
});
