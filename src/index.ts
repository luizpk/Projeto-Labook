
import express, {Request, Response} from 'express';
import cors from 'cors';
import { PostController } from './controller/PostController';
import { UserController } from './controller/UserController';
import { UserDatabase } from './database/UserDatabase';




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


const userController = new UserController()

app.post("/users", userController.signUpUsers)

// ***** POSTS *****

const postController = new PostController()

app.get("/posts", postController.getPosts)
app.post("/posts", postController.CreatePost)
app.put("/posts/:id", postController.editPost)
app.delete("/posts/:id", postController.deletePost) 