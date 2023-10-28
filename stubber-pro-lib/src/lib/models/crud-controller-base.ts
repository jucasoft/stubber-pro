
import { Request, Response } from 'express'
import {MyRequest} from "./my-request";

export class BaseController<T> {
    //add post controller
    public async create (req: MyRequest<T>, res: Response):Promise<void> {}
    public async createMany (req: MyRequest<T[]>, res: Response) :Promise<void>{}
    public async search (req: MyRequest, res: Response) :Promise<void>{}
    public async select (req: MyRequest, res: Response) :Promise<void>{}
    public async update (req: MyRequest<T>, res: Response) :Promise<void>{}
    public async updateMany (req: MyRequest<T[]>, res: Response) :Promise<void>{}
    public async delete (req: MyRequest<T>, res: Response) :Promise<void>{}
    public async deleteMany (req: MyRequest<T[]>, res: Response) :Promise<void>{}

}
