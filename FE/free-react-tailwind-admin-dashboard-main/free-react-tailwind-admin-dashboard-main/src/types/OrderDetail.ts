import { Book } from "./Book";

export interface OrderDetail{
    id:number,
    quantity: number,
    price: number,
    orderId: number,
    bookDto: Book,
    bookId: number
}