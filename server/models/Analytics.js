const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Analytics = sequelize.define('Analytics', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  pageViews: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { timestamps: true });

module.exports = Analytics;
