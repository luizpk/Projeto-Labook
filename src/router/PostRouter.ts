import express from 'express'
import { PostController } from '../controller/PostController'

export const postRouter = express.Router()

const postController = new PostController()

postRouter.get("/posts", postController.getPosts)
postRouter.post("/posts", postController.CreatePost)
postRouter.put("/posts/:id", postController.editPost)
postRouter.delete("/posts/:id", postController.deletePost) 