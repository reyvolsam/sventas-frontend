export class User{
    public id:number
    public name:string
    public email:string
    public group_id:number
    public campus_id:number
    public campus?:string
    public group?:string
    public avatar?:string
    public created_at?:string
    public access_token?: string
    public loader?:Boolean = false

}
