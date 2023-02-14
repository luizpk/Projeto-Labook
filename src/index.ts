
import express, {Request, Response} from 'express';
import cors from 'cors';
import { BaseDatabase } from './database/BaseDatabase';
import { EditedPost, TPostsDB, TUsersDB } from './types'
import { Post } from './models/Post'
import { User } from './models/User';
import { UserDatabase } from './database/UserDatabase';
import { PostDatabase } from './database/PostDatabase';

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

// getPosts

app.get("/posts", async (req: Request, res: Response) => {
  try {
    const q = req.query.q  as string | undefined

    const postDatabase = new PostDatabase()
    const postsDB = await postDatabase.findPosts(q)

    const posts: Post[] = postsDB.map((postDB) => new Post(
          postDB.id,
          postDB.creator_id,
          postDB.content,
          postDB.likes,
          postDB.dislikes,
          postDB.created_at,
          postDB.updated_at
      ))

      res.status(200).send(posts)
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
})

// ***** postPost *****

app.post("/posts", async (req: Request, res: Response) => {
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

      const [postExists]: TPostsDB[] | undefined[] = await db("posts").where({ id })

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
})

// ***** putPost *****

app.put("/posts/:id", async (req: Request, res: Response) => {
  try {

      const idPostEdit = req.params.id

      const { id, creator_id, content, likes, dislikes, created_at } = req.body 

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
   
    const newPost = new Post(
        postDBExist.id,
        postDBExist.creator_id,
        postDBExist.content,
        postDBExist.likes,
        postDBExist.dislikes,
        postDBExist.created_at,
        new Date().toISOString()
    )

    const newPostDB: EditedPost = {
        content: newPost.getContent(),
        likes: newPost.getLikes(),
        dislikes: newPost.getDislikes()
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
})

// ***** deletePost *****

app.delete("/posts/:id", async (req: Request, res: Response) => {
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
}) 