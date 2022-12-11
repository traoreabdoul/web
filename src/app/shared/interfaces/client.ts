import { Provider } from "./provider";

export interface Client{
    _id:string;
    name?:string;
    email?:string;
    phone?:string;
    providers?:Provider[]
}