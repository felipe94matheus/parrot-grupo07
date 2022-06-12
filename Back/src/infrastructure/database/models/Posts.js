const db = require("../../../infrastructure//database");
const { DataTypes } = require("sequelize");
const Users = require("./Users");

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
      allowNull: true,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    user_id: {
      type: DataTypes.INTEGER,
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