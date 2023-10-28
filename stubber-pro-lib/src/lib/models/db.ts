import { Buffer } from 'node:buffer';

export class Db {
  [key: string]: DbItem;
}

export class DbItem {
  // @ts-ignore
  public key: string;
  // @ts-ignore
  public createdAt: number;
  // @ts-ignore
  public active: boolean;
  // @ts-ignore
  public data: Buffer;
  // @ts-ignore
  public headers: { key: string; value: string }[];
}
