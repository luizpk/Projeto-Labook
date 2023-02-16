import { PostDatabase } from "../database/PostDatabase"
import { Post } from "../models/Post"
import { EditedPost } from "../types"
import { BadRequestError } from "../errors/BadRequestErrors"
import { NotFoundError } from "../errors/NotFoundErrors"


export class PostBusiness{
    
    //***** GET POSTS *****
    public getPosts = async(q:string|undefined)=> {

        const postDatabase = new PostDatabase()
           const postsDB = await postDatabase.findPosts(q)
    
            const post: Post[] = postsDB.map((postDB) => new Post(
                postDB.id,
                postDB.creator_id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at
            ))
            
            return ({post:post})


    }

    // ***** CREATE POST *****

    public createPost = async(input:any) => {

        const { id, creator_id, content, likes, dislikes } = input
  
        if (typeof id !== "string") {
            
            throw new BadRequestError("'id' deve ser uma string")
        }
  
        if (typeof creator_id !== "string") {
            
            throw new BadRequestError("'creator_id' deve ser uma string")
        }
  
        if (typeof content !== "string") {
            
            throw new BadRequestError("'content' deve ser uma string")
        }
  
        if (typeof likes !== "boolean") {
            
            throw new BadRequestError("'likes' deve ser um bolean")
        }
  
        if (typeof dislikes !== "boolean") {
            
            throw new BadRequestError("'dislikes' deve ser um bolean")
        }
  
        const postDB = new PostDatabase()
        const postExists= await postDB.findPostById(id)
  
        if (postExists) {
            
            throw new BadRequestError("Post com id já existente")
        }
  
        const newPost = new Post(
            id,
            creator_id,
            content,
            likes,
            dislikes,
            new Date().toISOString(),
            new Date().toISOString()
        )
  
        const newPostDB = {
            id: newPost.getId(),
            creator_id: newPost.getCreator_id(),
            content: newPost.getContent(),
            likes: newPost.getLikes(),
            dislikes: newPost.getDislikes(),
            created_at: newPost.getCreated_at(),
            updated_at: newPost.getUpdated_at()
        }
          
        postDB.insertPost(newPostDB)

        const output = {
            message: "Post criado com sucesso"
        }

        return {output};

    }

    //***** EDIT POST *****

    public editPost = async(input:any) => {


          
        const { idPostEdit, content,} = input
  
        const postDatabase = new PostDatabase()
  
        if (idPostEdit[0] !== "p") {
          
          throw new Error("'id' deve iniciar com a letra 'p'");
      }
  
      const postDBExist = await postDatabase.findPostById(idPostEdit)
  
      
  
      if (content !== undefined) {
          if (typeof content !== "string") {
              
              throw new BadRequestError("'content' deve ser uma string");
          }
      }
  
      if (!postDBExist) {
        
        throw new NotFoundError("post não encontrado")
    }
        
     
      const updatedPost = new Post(
          postDBExist.id,
          postDBExist.creator_id,
          postDBExist.content,
          postDBExist.likes,
          postDBExist.dislikes,
          postDBExist.created_at,
          new Date().toISOString()
      )
  
      const newPostDB: EditedPost = {
          content: updatedPost.getContent(),
          likes: updatedPost.getLikes(),
          dislikes: updatedPost.getDislikes()
      }
  
      postDatabase.editPost(newPostDB, idPostEdit)

      const outPut = {
        message: "Post atualizado com sucesso",
        post: updatedPost
    }

    return outPut
    }

    public deletePost = async(input:any) => {

        const idToDelete = input
          
        const postDatabase = new PostDatabase()
        const postDBExists = await postDatabase.findPostById(idToDelete)

        if (!postDBExists) {
            throw new NotFoundError("post não encontrado")
        }
        await postDatabase.deletePost(idToDelete)

        const outPut = {
            message: "Post deletado com sucesso",
        }

        return outPut
    }
 }