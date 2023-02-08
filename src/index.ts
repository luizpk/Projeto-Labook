
import express, {Request, Response} from 'express';
import cors from 'cors';
import { db } from './database/knex';



const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
  });

  // ***** USERS *****

  //getAllUsers


const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g;

  app.get('/users', async (req: Request, res: Response) => {
    try{

      const result = await db.raw(`
      SELECT * FROM users;
      `)

    res.status(200).send(result)
    } catch (error:any){
        console.log(error)

        if (res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message)
    }
  });

  // signupUser

  app.post('/users', async (req: Request, res: Response) => {
    try{
      

  const {id,name, email,password,role} = req.body
    

      const newUser = {
        id: id,
        name: name,
        email: email,
        password: password,
        role:role
      };
      
      if (typeof id !== "string") {
        res.status(400)
        throw new Error("'id' deve ser uma string");
      }
  
      if (id[0] !== "u") {
        res.status(400)
        throw new Error("'id' deve iniciar com a letra 'u'");
      }

      await db.raw(`
        INSERT INTO users (id, name, email, password, role)
        VALUES ("${id}", "${name}", "${email}", "${password}","${role}");
        `);

        res.send({ message: "Cadastro realizado com sucesso!" })


      const [userExists] = await db("user").where({id:id})

    if (userExists) {
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

    const [emailExists] = await db("users").where({ email: email });

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
    await db("users").insert(newUser);

      res.status(201).send('Usuário registrado com sucesso')
    }catch (error:any){
        console.log(error)

        if (res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message)
    }
  })
  