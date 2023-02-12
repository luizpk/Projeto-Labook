import {ENUM} from '../types';


export class User{
    
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: ENUM,
        private createdAt: string
    ){}

    public getId():string{
        return this.id
    }
   

    public getName():string{
        return this.name
    }
    public setName(newName:string):void{
        this.id=newName
   }

   public getEmail():string{
        return this.email
    }
   public setEmail(newEmail:string):void{
        this.id=newEmail
    }

    public getPassword():string{
        return this.password
    }
    public setPassword(newPassword:string):void{
        this.id=newPassword
   }

   public getRole(): ENUM {
    return this.role
}

public setRole(newRole: ENUM): void {
    this.role = newRole
}

public getCreatedAt(): string {
    return this.createdAt
}


}