//import modules
import { Response } from 'express';
import { MyRequest } from '../../models/my-request';
import { Db, DbItem } from '../../models/db';
import { Criteria } from '../../models/criteria';
import { BaseController } from '../../models/crud-controller-base';

export class DbItemController extends BaseController<DbItem> {
  constructor(private db: Db) {
    super();
  }

  public override search = async (
    req: MyRequest<Criteria>,
    res: Response
  ): Promise<void> => {
    console.log('ItemController.search()');
    const criteria = req.body;
    const keys = Object.keys(this.db);
    res.send(
      JSON.stringify(keys.map((key: string) => ({ ...this.db[key], key })))
    );
  };

  // public select = async (req: MyRequest<Criteria>, res: Response) :Promise<void> =>{}
  // public create = async (req: MyRequest<DbItem>, res: Response):Promise<void> => {}
  // public createMany = async (req: MyRequest<DbItem[]>, res: Response) :Promise<void>=> {}
  public override update = async (
    req: MyRequest<DbItem>,
    res: Response
  ): Promise<void> => {
    const dbItem: DbItem = req.body;
    console.log('DbItem: ', DbItem);
    this.db[dbItem.key] = dbItem;
    const keys = Object.keys(this.db);
    res.send(
      JSON.stringify(keys.map((key: string) => ({ ...this.db[key], key })))
    );
  };
  // public updateMany = async (req: MyRequest<DbItem[]>, res: Response) :Promise<void>=> {}

  public override delete = async (
    req: MyRequest<DbItem>,
    res: Response
  ): Promise<void> => {
    const dbItem: DbItem = req.body;
    console.log('DbItem: ', DbItem);
    delete this.db[dbItem.key];
    const keys = Object.keys(this.db);
    res.send(
      JSON.stringify(keys.map((key: string) => ({ ...this.db[key], key })))
    );
  };
  // public deleteMany = async (req: MyRequest<DbItem[]>, res: Response) :Promise<void>=> {}
}
