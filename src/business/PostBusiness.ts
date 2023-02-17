import { PostDatabase } from "../database/PostDatabase"
import { Post } from "../models/Post"
import { EditedPost } from "../types"
import { BadRequestError } from "../errors/BadRequestErrors"
import { NotFoundError } from "../errors/NotFoundErrors"
import { CreatedPostInputDTO, PostDTO } from "../dtos/PostDTO"

const date = new Date().toISOString()

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

    public createPost = async(input:CreatedPostInputDTO) => {

        const { id, creator_id, content, likes, dislikes } = input
    
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
            date,
            date
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
        const postExists= await postDatabase.findPostById(idPostEdit)

        if (!postExists) {
            throw new BadRequestError("Post nao encontrado");

        }

        const postEdit = new Post(
            postExists.id,
            postExists.creator_id,
            postExists.content,
            postExists.likes,
            postExists.dislikes,
            postExists.created_at,
            postExists.updated_at
        )
        
        postEdit.setContent(content)
        postEdit.setUpdated_at(date)
        const postEditedDB: EditedPost = {
            content: postEdit.getContent(),
            updated_at: date

        }
        await postDatabase.editPost(postEditedDB, idPostEdit)

        

        const outPut = {
            message: "Post atualizado com sucesso",
            post: postEdit
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