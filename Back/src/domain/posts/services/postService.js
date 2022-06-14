const { Posts } = require("../models")
const Sequelize = require("sequelize")

const PostService = {

    async register(data,tokenId){

        const newPost = await Posts.create({
            ...data,
            user_id: tokenId
        })

        return newPost

    },

    async getUserPosts(id){

        return await Posts.findAll({where : {user_id : id}});

    },

    
}

module.exports = PostService;