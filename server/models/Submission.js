const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Submission = sequelize.define('Submission', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, defaultValue: '' },
  message: { type: DataTypes.TEXT, allowNull: false },
}, { timestamps: true });

Submission.prototype.toJSON = function () {
  const values = { ...this.get() };
  values._id = values.id;
  return values;
};

module.exports = Submission;
