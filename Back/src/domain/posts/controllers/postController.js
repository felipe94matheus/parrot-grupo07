const { Posts } = require("../models")
const Sequelize = require("sequelize");
const PostService = require("../services/postService");

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
            const { id } = req.params;
            const postsFromUser = await PostService.getUserPosts(id)
            
            if(postsFromUser === null) return res.status(201).json('O usuário não contém posts')
            
            return res.status(201).json(postsFromUser)
        
        } catch(error) {

            console.log(error)
            res.status(404).json('Algo deu errado ao verificar os posts do usuário')
        }

    },

    async getAll(req, res) {
        try {

          const posts = await Posts.findAll();
          return res.json(posts);

        } catch (error) {

          return res.status(500).json("Os posts não puderam ser carregados");
        
        }
      },

    async delete(req,res){
        
        try{
        
        const { idPost } = req.params;
        if(await Posts.findByPk(idPost)){
        await Posts.destroy({where: {id_post: idPost}})
        return res.status(204).json('Post deletado com sucesso!')
        }
        return res.status(404).json('Post inexistente') 
    
    } catch(error) {

        console.log(error)
            res.status(500).json('Erro ao deletar post.')
        }
    },

    async update(req,res){
        
        try{

            const { idPost } = req.params;
            const payloadUpdate = {};
            Object.assign(payloadUpdate, req.body)
        
            await Posts.update(payloadUpdate, {
                where: { id_post: idPost },
              })
            
            const updatedPost = await Posts.findByPk(idPost)
            
            res.send(200).json(updatedPost)
         

        } catch(error) {
            console.log(error)
            return res.status(500).json("Algo deu errado ao atualizar o post");

        }
    }

}

module.exports = PostController