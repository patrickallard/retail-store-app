import { Product } from "./product";

export class Order {
    constructor(
       public id: number,
       public email: string,
       public date: Date,
       public products: Product[],
       public orderTotal: number
    ) {}
}