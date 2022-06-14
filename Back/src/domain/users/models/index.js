const Users = require("./Users");
const Posts = require("../../posts/models/Posts");

Users.hasMany(Posts, {
    foreignKey: "user_id",
})

module.exports = {
    Users
}