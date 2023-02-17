import { BadRequestError } from "../errors/BadRequestErrors"
import { Post } from "../models/Post"

export interface CreatedPostInputDTO {
    id:string,
    creator_id: string,
    content: string, 
    likes: boolean, 
    dislikes: boolean
}

export interface CreatedPostOutputDTO{

    message:string,
    post: {

        id: string,
        creator_id: string,
        content: string,
        likes: boolean,
        dislikes: boolean,
        created_at: string,
        updated_at: string
    }

}

export interface EditPostInputDTO {
    idToEdit: string,
    content: string | undefined,
    
}

export interface EditPostOutputDTO {
    message: string,
    post: {
        id: string,
        content: string,
    }
}


export class PostDTO {

    public createdPostInput(

        id:unknown, 
        creator_id: unknown, 
        content: unknown, 
        likes: unknown, 
        dislikes: unknown

    ): CreatedPostInputDTO{

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

        const dto: CreatedPostInputDTO={

            id, 
            creator_id, 
            content, 
            likes, 
            dislikes
        }

        return dto
    }

    public createdPostOutput(post:Post){
        const dto: CreatedPostOutputDTO = {
            message: "Post registrado com sucesso.",
            post:{

            id: post.getId(),
            creator_id: post.getCreator_id(), 
            content: post.getContent(),
            likes: post.getLikes(),
            dislikes: post.getDislikes(),
            created_at: post.getCreated_at(),
            updated_at: post.getUpdated_at()

            }
        }
    }


    public editPostInput(
        idToEdit: string,
        content: unknown
    ){
                
        if(content !== undefined) {
            if (typeof content !== "string") {
                throw new BadRequestError("'content' deve ser string");
            }
        }
           
        const dto: EditPostInputDTO = {
            idToEdit,
            content
            
        }

        return dto
    }

    public editPostOutput(post: Post): EditPostOutputDTO {
        const dto: EditPostOutputDTO = {
            message: "Post editado com sucesso",
            post:{

                id: post.getId(),
                creator_id: post.getCreator_id(), 
                content: post.getContent(),
                likes: post.getLikes(),
                dislikes: post.getDislikes(),
                created_at: post.getCreated_at(),
                updated_at: post.getUpdated_at()
    
                }
        }

        return dto
    }
}
