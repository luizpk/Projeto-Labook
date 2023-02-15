
import express, {Request, Response} from 'express';
import cors from 'cors';
import { PostController } from './controller/PostController';




const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/ping', (req: Request, res: Response) => {
  try {
    res.send('Pong!')
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
  });




  // ***** USERS *****

  //getAllUsers

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

  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g;
           

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

  
  // loginUser

//   app.get('/users', async (req: Request, res: Response) => {
//     try{

//       const resultUser = await db.raw(`
//       SELECT * FROM users;
//       `)
//     res.status(200).send(resultUser)
//     } catch (error:any){
//         console.log(error)

//         if (res.statusCode === 200){
//             res.status(500)
//         }

//         res.send(error.message)
//     }
//   });

// ***** POSTS *****

const postController = new PostController()

app.get("/posts", postController.getPosts)
app.post("/posts", postController.CreatePost)
app.put("/posts/:id", postController.editPost)
app.delete("/posts/:id", postController.deletePost) 