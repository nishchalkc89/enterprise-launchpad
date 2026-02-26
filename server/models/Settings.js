const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Settings = sequelize.define('Settings', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  companyName: { type: DataTypes.STRING, defaultValue: '' },
  pocName: { type: DataTypes.STRING, defaultValue: '' },
  phone: { type: DataTypes.STRING, defaultValue: '' },
  email: { type: DataTypes.STRING, defaultValue: '' },
}, { timestamps: true });

Settings.prototype.toJSON = function () {
  const values = { ...this.get() };
  values._id = values.id;
  return values;
};

module.exports = Settings;
