const Posts = require("./Posts");
const Users = require("../../users/models/Users");

Posts.belongsTo(Users, {
    foreignKey: "user_id",
});

module.exports = {
    Posts
}