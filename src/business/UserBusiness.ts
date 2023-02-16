import { UserDatabase } from "../database/UserDatabase"
import { User } from "../models/User"
import { BadRequestError } from "../errors/BadRequestErrors"
import { NotFoundError } from "../errors/NotFoundErrors"



export class UserBusiness {

    public getUser = async (q: any) => {
        
        const userDatabase = new UserDatabase();
        const usersDB = await userDatabase.findUsers(q)

        const users: User[] = usersDB.map((userDB) => new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        ))
        return ({users: users})
    }




public signInUser = async() =>{

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
                 
                  throw new BadRequestError("'id' deve ser uma string");
                }
            
                if (id[0] !== "u") {
                  
                  throw new BadRequestError("'id' deve iniciar com a letra 'u'");
                }
          
                         
                  res.send({ message: "Cadastro realizado com sucesso!" })
          
          
                  const userDatabase = new UserDatabase()
                  const userDBExists = await userDatabase.findUserById(id)
          
              if (userDBExists) {
                
                throw new BadRequestError("'id' já existente")
              }
                 
              if (typeof email !== "string") {
               
                throw new BadRequestError("Digite um email válido")
              }
          
              
               if (!email.match(regexEmail)) {
                 
                 throw new BadRequestError(
                   "Digite um email válido."
                 );
              }
          
              const emailExists = await userDatabase.findUserById(email)
          
                if (emailExists) {
                 
                  throw new BadRequestError("'email' já cadastrado");
                }
              
              if (typeof name !== "string") {
                
                throw new BadRequestError("'nome' deve ser uma string");
              }
              
              if (typeof password !== "string") {
                
                throw new BadRequestError("'password' deve ser uma string")
              }
          
              if (!password.match(regexPassword)) {
               
                throw new BadRequestError("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
              }
              
              userDatabase.insertUser(newUserDB)
          
            }



}



