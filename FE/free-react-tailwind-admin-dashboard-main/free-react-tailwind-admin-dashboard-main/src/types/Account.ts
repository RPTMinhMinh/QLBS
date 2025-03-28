import { Role } from "./Role";

export interface Account {
    id: number;
    fullname:string,
    email:string,
    phone:string,
    address:string,
    roles:Role[],
    imageUrl:string
}