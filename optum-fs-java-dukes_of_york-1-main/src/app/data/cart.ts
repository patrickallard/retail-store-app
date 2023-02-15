import { Product } from "./product";

export class Cart {
    constructor(
        public id: number | null,
        public userId: number,
        public products: Product[]
    ) {}
}