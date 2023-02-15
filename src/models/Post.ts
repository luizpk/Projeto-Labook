
export class Post {
    constructor(
        private id: string,
        private creator_id: string,
        private content: string,
        private likes: boolean,
        private dislikes: boolean,
        private created_at: string,
        private updated_at: string
    ) { }

    public getId(): string {
        return this.id
    }
    

    public getCreator_id(): string {
        return this.creator_id
    }



    public getContent(): string {
        return this.content
    }
    public setContent(newContent: string): void {
        this.content = newContent
    }


    public getLikes(): boolean {
        return this.likes
    }
    public setLikes(newLikes: boolean): void {
        this.likes = newLikes
    }


    public getDislikes(): boolean {
        return this.dislikes
    }
    public setDislikes(newDislikes: boolean): void {
        this.dislikes = newDislikes
    }



    public getCreated_at(): string {
        return this.created_at
    }
    public setCreated_at(newCreatedAt: string): void {
        this.created_at = newCreatedAt
    }



    public getUpdated_at(): string {
        return this.updated_at
    }
    public setUpdated_at(newUpdatedAt: string): void {
        this.updated_at = newUpdatedAt
    }
}