import { Response } from 'express'

import {Criteria} from "../../models/criteria";
import {CrudControllerBase} from "../../models/crud-controller-base";
import {Db, DbItem} from "../../models/db";
import {MyRequest} from "../../models/my-request";

export class DbItemController extends CrudControllerBase<DbItem> {

    constructor(private db: Db) {
        super();
    }

    public override search = async (req: MyRequest<Criteria>, res: Response): Promise<void> => {
        console.log("ItemController.search()");
        const criteria: Criteria<any> = req.body
        console.log("criteria: ", criteria);
        const keys: string[] = Object.keys(this.db)
        res.send(JSON.stringify(keys.map((key: string) => ({...this.db[key], key}))));
    }

    public override update = async (req: MyRequest<DbItem>, res: Response): Promise<void> => {
        const dbItem: DbItem = req.body
        console.log("dbItem: ", dbItem);
        this.db[dbItem.key] = dbItem
        const keys: string[] = Object.keys(this.db)
        res.send(JSON.stringify(keys.map((key: string) => ({...this.db[key], key}))));
    }

    public override delete = async (req: MyRequest<DbItem>, res: Response): Promise<void> => {
        const dbItem: DbItem = req.body
        console.log("dbItem: ", dbItem);
        delete this.db[dbItem.key]
        const keys: string[] = Object.keys(this.db)
        res.send(JSON.stringify(keys.map((key: string) => ({...this.db[key], key}))));
    }
}
