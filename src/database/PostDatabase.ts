import { PostsDB, EditedPost } from "../types";
import { BaseDatabase } from "./BaseDatabase";


export class PostDatabase extends BaseDatabase {


    public static TABLE_POST = "posts"


    public async findPosts(q: string | undefined): Promise<PostsDB[]> {
        let postsDB

        if (q) {
            const result: PostsDB[] = await BaseDatabase
                .connection(PostDatabase.TABLE_POST)
                .where("content", "LIKE", `%${q}%`)
            postsDB = result
        } else {
            const result: PostsDB[] = await BaseDatabase
                .connection(PostDatabase.TABLE_POST)
            postsDB = result
        }
        return postsDB
    }


    public async findPostById(id: string | undefined): Promise<PostsDB | undefined> {
        const [postDBExists]: PostsDB[] | undefined[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .where({ id })
        return postDBExists
    }


    public async findUserById(creatorId: string | undefined): Promise<PostsDB | undefined> {
        const [userDBExists]: PostsDB[] | undefined[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .where({ id: creatorId })
        return userDBExists
    }


    public async insertPost(newPostDB: PostsDB): Promise<void> {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .insert(newPostDB)
    }


    public async editPost(newPostDB: EditedPost, id: string): Promise<void> {
        await BaseDatabase.connection(PostDatabase.TABLE_POST)
            .update(newPostDB)
            .where({ id })
    }


    public async deletePost(id: string): Promise<void> {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .del()
            .where({ id })
    }
}