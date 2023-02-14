

export type TUsersDB = {
    id: string,
    name: string,
    email: string,
    password: string,
    role: ENUM,
    created_at: string
}

export type TPostsDB = {
    id: string,
    creator_id: string,
    content: string,
    likes: boolean,
    dislikes: boolean,
    created_at: string,
    updated_at: string,
}


export type ENUM = {
    admin: "ADMIN",
    user: "USER"
}

export interface EditedPost {
    content: string,
    likes: boolean,
    dislikes: boolean
}