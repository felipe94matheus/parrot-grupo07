const Users = require('./Users');
const Posts = require('./Posts');

Posts.belongsTo(Users, {
    foreignKey: "user_id",
});

Users.hasMany(Posts, {
    foreignKey: "user_id",
})

module.exports = {
    Users,
    Posts
}