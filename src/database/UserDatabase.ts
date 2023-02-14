import { BaseDatabase } from "./BaseDatabase";
import { TUsersDB } from "../types";

export class UserDatabase extends BaseDatabase{
    //atributos
    public static TABLE_USERS = "users"


    //metodos
    public async findUsers(q: string | undefined): Promise<TUsersDB[]>{
        let usersDB
        if (q) {
            const result: TUsersDB[] = await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .where("id","name", "LIKE", `%${q}%`)
            usersDB = result
        } else {
            const result: TUsersDB[] = await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
            usersDB = result
        }
        return usersDB
    }

    public async findUserById(id : string | undefined): Promise <TUsersDB | undefined>{
        const [ userDBExists ]: TUsersDB[] | undefined[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ id })
        return userDBExists
    }

    public async insertUser(newUserDB: TUsersDB ): Promise<void>{
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

    public async editUser(editUserDB: TUsersDB, id: string): Promise<void> {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .update(editUserDB)
            .where({ id })
    }


}

