const db = require("../index");
const { DataTypes } = require("sequelize");

const Users = db.define(
  "Users",
  {
    id_user: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
    appartment: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = Users;

