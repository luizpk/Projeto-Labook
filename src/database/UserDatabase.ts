import { BaseDatabase } from "./BaseDatabase";
import { UsersDB } from "../types";

export class UserDatabase extends BaseDatabase{
    //atributos
    public static TABLE_USERS = "users"


    //metodos
    public async findUsers(q: string | undefined): Promise<UsersDB[]>{
        let usersDB
        if (q) {
            const result: UsersDB[] = await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .where("name", "LIKE", `%${q}%`)
            usersDB = result
        } else {
            const result: UsersDB[] = await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
            usersDB = result
        }
        return usersDB
    }

    public async findUserById(id : string | undefined): Promise <UsersDB | undefined>{
        const [ userDBExists ]: UsersDB[] | undefined[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ id })
        return userDBExists
    }

    public async insertUser(newUserDB: UsersDB ): Promise<void>{
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(newUserDB)
    }

   
    public async deleteUser(id: string): Promise<void> {
        await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .del()
        .where({ id })
    }

    public async editUser(editUserDB: UsersDB, id: string): Promise<void> {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .update(editUserDB)
            .where({ id })
    }


}

