const { Posts } = require("../models")
const Sequelize = require("sequelize");
const PostService = require("../services/postService");
const UserService = require("../../users/services/userService")

const PostController = {

    async createPost(req, res)  {

        try{
            const newPost = await PostService.register(req.body, req.auth.id_user);
            return res.status(201).json(newPost)
        }

        catch(error){
            console.log(error)
            return res.status(500).json('Algo deu errado na criação do post')
        }

    },

    async getPostByUserId(req,res){


        try{
            const findUser = await UserService.findUser(req.params)
            if(!findUser) return res.status(404).json("Não foi possível localizar o usuário ");

            const { id } = req.params;
            const postsFromUser = await PostService.getUserPosts(id)
            
            if(!postsFromUser) return res.status(201).json('O usuário não contém posts')
            
            return res.status(201).json(postsFromUser)
        
        } catch(error) {
            console.log(error)
            res.status(500).json('Algo deu errado ao verificar os posts desse usuário')
        }

    },

    async getAll(req, res) {
        

        try {
        
        const feed = await PostService.getAll();
        if(!feed) return res.status(201).json('No momento, não há posts para exibir')
          
        return res.json(feed);

        } catch (error) {

        return res.status(500).json("Os posts não puderam ser carregados");
        
        }
      },

    async delete(req,res){
        
        try{
            const { id } = req.params;
            if(!await PostService.postExists(id)) return res.status(404).json('Post inexistente')
        
            const { user_id } = await PostService.getPostById(id)
            
            if(await PostService.isAuthorized(req,user_id)){
             
                if(PostService.delete(id)){
                    return res.status(204).json('Post deletado com sucesso!')         
                }
    
            } else { res.status(401).json('Unauthorized')}
        } catch(error) {

            console.log(error)
            res.status(500).json('Ocorreu um erro ao deletar post.')

        }
    },

    async update(req,res){

        try{
            const { id } = req.params;
            if(!await PostService.postExists(id)) return res.status(404).json('Post inexistente')
            
            const actualPost = await PostService.getPostById(id);
            if(actualPost.content === req.body.content) return res.status(200).json('Não houve mudanças no Post')
            
            if(await PostService.isAuthorized(req,actualPost.user_id)){
            const payloadUpdate = {};
            Object.assign(payloadUpdate, req.body)
            
            if(await PostService.updatePost(id, payloadUpdate)){            
            const updatedPost = await PostService.getPostById(id);
            res.status(200).json(updatedPost)
            }
         
        } else { res.status(401).json('Unauthorized')}

        } catch(error) {
            console.log(error)
            return res.status(500).json("Algo deu errado ao atualizar o post");
        }
},

}

module.exports = PostController