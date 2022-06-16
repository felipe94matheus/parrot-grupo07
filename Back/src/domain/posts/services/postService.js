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

    async getAll(){
        return await Posts.findAll();   
    },

    async delete(id){
        return await Posts.destroy({where: {id_post: id}})
    },

    async updatePost(id,payloadUpdate){

        return await Posts.update(payloadUpdate, {
            where: { id_post: id },
          })
        
    },

    async getPostById(id){
        return await Posts.findByPk(id)
    },

    async isAuthorized(req, id){
    return await req.auth.id_user == id || req.auth.adm;
    },

    async postExists(id){
        return await Posts.count({
            where: {
              id_post: id,
            },
          });
    },

    async isEmpty(data){
        if (data=[]){
            return true;
        }
        return false
    },
    
}

module.exports = PostService;