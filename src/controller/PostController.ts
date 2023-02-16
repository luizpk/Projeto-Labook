import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { PostDatabase } from "../database/PostDatabase"
import { Post } from "../models/Post"
import { EditedPost, PostsDB } from "../types"
import { BaseError } from "../errors/BaseErrors"


export class PostController {

    //***** GET POSTS *****
    public getPosts = async (req: Request, res: Response) => {
        try {
            const q = req.query.q as string | undefined
    
           const postBusiness = new PostBusiness();
           const output = await postBusiness.getPosts(q);
    
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof BaseError) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }




public CreatePost =  async (req: Request, res: Response) => {

    try {
       
        const input = {
            id:req.body.id, 
            creator_id: req.body.creator_id, 
            content: req.body.content, 
            likes: req.body.likes, 
            dislikes: req.body.dislikes
        }

        const postBusiness = new PostBusiness();
        const output = await postBusiness.createPost(input);
  
              res.status(201).send(output)
    } catch (error) {
        console.log(error)
  
        if (req.statusCode === 200) {
            res.status(500)
        }
  
        if (error instanceof BaseError) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
  }



  //**** EDIT POST *****
  
  public editPost = async (req: Request, res: Response) => {
    
    try {

        const input = {
            idToEdit: req.params.id,
            content: req.body.content,
            
        }

        const postBusiness = new PostBusiness()
        const outPut = await postBusiness.editPost(input)
  
      res.status(200).send(outPut)
  
  
  }catch (error) {
    console.log(error)
  
    if (req.statusCode === 200) {
        res.status(500)
    }
  
    if (error instanceof BaseError) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
  }




  public deletePost = async (req: Request, res: Response) => {
    try {

        const input = req.params.id
        const postBusiness = new PostBusiness()

        const output = postBusiness.deletePost(input)
           
        res.status(200).send(output)
        
    } catch (error) {
        console.log(error)
  
        if (req.statusCode === 200) {
            res.status(500)
        }
  
        if (error instanceof BaseError) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
  }
}
