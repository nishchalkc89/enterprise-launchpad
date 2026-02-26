const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Service = sequelize.define('Service', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  icon: { type: DataTypes.STRING, defaultValue: 'Briefcase' },
  order: { type: DataTypes.INTEGER, defaultValue: 0 },
  visible: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { timestamps: true });

Service.prototype.toJSON = function () {
  const values = { ...this.get() };
  values._id = values.id;
  return values;
};

module.exports = Service;
