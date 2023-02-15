export class User {
    constructor(
        public id: number,
        public password: string,
        public email: string,
        public fname: string,
        public lname: string,
        public role: number
    ){}
}