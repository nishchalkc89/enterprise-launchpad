const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Content = sequelize.define('Content', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  sectionId: { type: DataTypes.STRING, allowNull: false, unique: true },
  title: { type: DataTypes.STRING, defaultValue: '' },
  subtitle: { type: DataTypes.STRING, defaultValue: '' },
  body: { type: DataTypes.TEXT, defaultValue: '' },
  visible: { type: DataTypes.BOOLEAN, defaultValue: true },
  metadata: {
    type: DataTypes.TEXT('long'),
    defaultValue: '{}',
    get() {
      const raw = this.getDataValue('metadata');
      try { return JSON.parse(raw || '{}'); } catch { return {}; }
    },
    set(val) {
      this.setDataValue('metadata', JSON.stringify(val || {}));
    },
  },
}, {
  timestamps: true,
});

Content.prototype.toJSON = function () {
  const values = { ...this.get() };
  values._id = values.id;
  // Parse metadata if string
  if (typeof values.metadata === 'string') {
    try { values.metadata = JSON.parse(values.metadata); } catch { values.metadata = {}; }
  }
  return values;
};

module.exports = Content;
