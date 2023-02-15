import { Request, Response } from "express"
import { BaseDatabase } from "../database/BaseDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { User } from "../models/User" 
import { UsersDB, ENUM } from "../types"

export class UserController {
    
    public signUpUsers = async (req: Request, res: Response) => {
        try{

            const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
          
            const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g;
                     
          
            const {id,name, email,password,role} = req.body
              
          
            const newUser = new User(
              id,
              name,
              email,
              password,
              role,
              new Date().toISOString()
          ) 
  
          const newUserDB: UserDatabase = {
              id: newUser.getId(),
              name: newUser.getName(),
              email: newUser.getEmail(),
              password: newUser.getPassword(),
              role: newUser.getRole(),
              created_at: newUser.getCreatedAt()
          }


                
                if (typeof id !== "string") {
                  res.status(400)
                  throw new Error("'id' deve ser uma string");
                }
            
                if (id[0] !== "u") {
                  res.status(400)
                  throw new Error("'id' deve iniciar com a letra 'u'");
                }
          
                         
                  res.send({ message: "Cadastro realizado com sucesso!" })
          
          
                  const userDatabase = new UserDatabase()
                  const userDBExists = await userDatabase.findUserById(id)
          
              if (userDBExists) {
                res.status(400)
                throw new Error("'id' já existente")
              }
                 
              if (typeof email !== "string") {
                res.status(400)
                throw new Error("Digite um email válido")
              }
          
              
               if (!email.match(regexEmail)) {
                 res.status(400);
                 throw new Error(
                   "Digite um email válido."
                 );
              }
          
              const emailExists = await userDatabase.findUserById(email)
          
                if (emailExists) {
                  res.status(400);
                  throw new Error("'email' já cadastrado");
                }
              
              if (typeof name !== "string") {
                res.status(400);
                throw new Error("'nome' deve ser uma string");
              }
              
              if (typeof password !== "string") {
                res.status(400)
                throw new Error("'password' deve ser uma string")
              }
          
              if (!password.match(regexPassword)) {
                res.status(400)
                throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
              }
              
              userDatabase.insertUser(newUserDB)
          
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