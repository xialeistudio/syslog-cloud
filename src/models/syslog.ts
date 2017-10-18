import * as Sequelize from 'sequelize';
import database from '../common/database';

export interface SyslogAttributes {
  facility: number;
  severity: number;
  tag: string;
  time: Date;
  hostname: string;
  address: string;
  family: string;
  port: number;
  size: number;
  msg: string;
}

export interface SyslogInstance extends Sequelize.Instance<SyslogAttributes> {
}

export default database.define<SyslogInstance, SyslogAttributes>('syslog', {
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
