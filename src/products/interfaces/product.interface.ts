import { Document } from "mongoose";

export interface Product extends Document{ //extends Document es para poder trabajar con mngo
    readonly name: string;
    readonly description: string;
    readonly imageURL: string;
    readonly price: number;
    readonly createdAt: Date;
}