const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Media = sequelize.define('Media', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  url: { type: DataTypes.STRING },
}, { timestamps: true });

Media.prototype.toJSON = function () {
  const values = { ...this.get() };
  values._id = values.id;
  return values;
};

module.exports = Media;
