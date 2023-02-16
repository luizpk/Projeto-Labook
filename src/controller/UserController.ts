import { Request, Response } from "express"
import { BaseDatabase } from "../database/BaseDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { User } from "../models/User" 
import { UsersDB, ENUM } from "../types"

export class UserController {

  public getUsers = async (req: Request, res: Response) => {
    try {
        const input = {q: req.query.q}

        const outPut = await this.userBusinnes.getUser(input)

        res.status(200).send(outPut)
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



    
    public signUpUsers = async (req: Request, res: Response) => {
        try{

            
          
                res.status(201).send('Usuário registrado com sucesso')
              }catch (error:any){
                  console.log(error)
          
                  if (res.statusCode === 200){
                      res.status(500)
                  }
          
                  res.send(error.message)
              }
            }

}