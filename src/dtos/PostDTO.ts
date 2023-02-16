import { BadRequestError } from "../errors/BadRequestErrors"

export interface CreatedPostInputDTO {
    id:string,
    creator_id: string,
    content: string, 
    likes: boolean, 
    dislikes: boolean
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


}