import * as Sequelize from 'sequelize';
import database from '../common/database';

export interface AdminAttributes {
  id?: number;
  username?: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
}

export interface AdminInstance extends Sequelize.Instance<AdminAttributes> {
}

export default database.define<AdminInstance, AdminAttributes>('admin', {
  id: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER },
  username: { allowNull: false, type: Sequelize.STRING(20), comment: '用户名', unique: true },
  password: { allowNull: false, type: Sequelize.CHAR(32), comment: '密码' },
}, {
  underscored: true,
  tableName: 's_admin',
});
