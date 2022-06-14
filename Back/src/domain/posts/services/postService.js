const { Posts } = require("../../../infrastructure/database/models")
const Sequelize = require("sequelize")

const PostService = {

async register(data){

    const newPost = await Posts.create({
        ...data,
        //user_id front que pega?
    })

    return newPost

},

async getUserPosts(id){

return await Posts.findAll({where : {user_id : id}});

},


}

module.exports = PostService;