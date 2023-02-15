import { Request, Response } from "express"
import { PostDatabase } from "../database/PostDatabase"
import { Post } from "../models/Post"
import { EditedPost, PostsDB } from "../types"


export class PostController {

    public getPosts = async (req: Request, res: Response) => {
        try {
            const q = req.query.q as string | undefined
    
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
    
            res.status(200).send(post)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }


public CreatePost =  async (req: Request, res: Response) => {

    try {
        const { id, creator_id, content, likes, dislikes } = req.body
  
        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser uma string")
        }
  
        if (typeof creator_id !== "string") {
            res.status(400)
            throw new Error("'creator_id' deve ser uma string")
        }
  
        if (typeof content !== "string") {
            res.status(400)
            throw new Error("'content' deve ser uma string")
        }
  
        if (typeof likes !== "boolean") {
            res.status(400)
            throw new Error("'likes' deve ser um bolean")
        }
  
        if (typeof dislikes !== "boolean") {
            res.status(400)
            throw new Error("'dislikes' deve ser um bolean")
        }
  
        const postExists= await PostDatabase.findPostById(id)
  
        if (postExists) {
            res.status(400)
            throw new Error("Post com id já existente")
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
  
        const userDatabase = new PostDatabase()
        const userDBExist = await userDatabase.findUserById(creator_id)
  
        PostDatabase.insertPost(newPostDB) //**** */
  
              res.status(201).send(newPost)
    } catch (error) {
        console.log(error)
  
        if (req.statusCode === 200) {
            res.status(500)
        }
  
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
  }

  public editPost = async (req: Request, res: Response) => {
    
    try {

        const idPostEdit = req.params.id
  
        const { content, likes, dislikes, created_at } = req.body 
  
        const postDatabase = new PostDatabase()
  
        if (idPostEdit[0] !== "p") {
          res.status(400);
          throw new Error("'id' deve iniciar com a letra 'p'");
      }
  
      const postDBExist = await postDatabase.findPostById(idPostEdit)
  
      
  
      if (content !== undefined) {
          if (typeof content !== "string") {
              res.status(400);
              throw new Error("'content' deve ser uma string");
          }
      }
  
      if (!postDBExist) {
        res.status(404)
        throw new Error("post não encontrado")
    }
  
      if( likes !== undefined) {
          if (typeof likes !== "boolean") {
              res.status(400)
              throw new Error("'likes' deve ser um bolean")
          }
      }
     
      if(dislikes !== undefined) {
          if (typeof dislikes !== "boolean") {
              res.status(400)
               throw new Error("'dislikes' deve ser um bolean")
          }
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
  
      res.status(200).send("post atualizado com sucesso")
  
  
  }catch (error) {
    console.log(error)
  
    if (req.statusCode === 200) {
        res.status(500)
    }
  
    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
  }

  public deletePost = async (req: Request, res: Response) => {
    try {

        const idToDelete = req.params.id
  
        const postDatabase = new PostDatabase()
        const postExist = await postDatabase.findPostById(idToDelete)
  
        if (!postExist) {
            res.status(404)
            throw new Error("post não encontrado")
        }
  
        postDatabase.deletePost(idToDelete)
        res.status(200).send("post deletado com sucesso")
        
    } catch (error) {
        console.log(error)
  
        if (req.statusCode === 200) {
            res.status(500)
        }
  
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
  }
}
