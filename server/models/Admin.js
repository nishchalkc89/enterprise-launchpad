const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const Admin = sequelize.define('Admin', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
}, {
  timestamps: true,
  hooks: {
    beforeCreate: async (admin) => {
      admin.password = await bcrypt.hash(admin.password, 12);
    },
    beforeUpdate: async (admin) => {
      if (admin.changed('password')) {
        admin.password = await bcrypt.hash(admin.password, 12);
      }
    },
  },
  toJSON() {
    return { ...this.get(), _id: this.id };
  },
});

Admin.prototype.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

Admin.prototype.toJSON = function () {
  const values = { ...this.get() };
  values._id = values.id;
  delete values.password;
  return values;
};

module.exports = Admin;
