import {Buffer} from "node:buffer";

export interface Db {
    [key: string]: DbItem
}

export interface DbItem {
    key: string;
    createdAt: number;
    active: boolean;
    data: Buffer;
    headers: { key: string, value: string }[];
}
