import * as Sequelize from 'sequelize';
import { database } from '../config';

export default new Sequelize(database.database, database.username, database.password, database.options);
