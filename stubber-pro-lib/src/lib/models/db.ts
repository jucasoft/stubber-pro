import {Buffer} from "node:buffer";

export class Db {
    [key: string]: DbItem
}

export class DbItem {
    public key:string;
    public createdAt:number;
    public active:boolean;
    public data: Buffer;
    public headers: { key: string, value: string }[];

}

