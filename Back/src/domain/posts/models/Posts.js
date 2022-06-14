const db = require("../../../infrastructure/database");
const { DataTypes } = require("sequelize");
const Users = require("../../users/models/Users");

const Posts = db.define(
  "Posts",
  {
    id_post: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    content: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    user_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      references: {
        model: "Users",
        key: "id_user"
      },
      allowNull: false,
    }
  },
  {
    tableName: "posts",
    timestamps: true,
  }
);

module.exports = Posts;