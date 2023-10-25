import {MyRequest} from "./my-request";
import {Request, Response} from "express";

export class CrudControllerBase<T> {

  public async create(req: MyRequest<T>, res: Response): Promise<void> {
  }

  public async createMany(reg: MyRequest<T[]>, res: Response): Promise<void> {
  }

  public async search(reg: MyRequest, res: Response): Promise<void> {
  }

  public async select(req: MyRequest, res: Response): Promise<void> {
  }

  public async update(req: MyRequest<T>, res: Response): Promise<void> {
  }

  public async updateMany(reg: MyRequest<T[]>, res: Response): Promise<void> {
  }

  public async delete(req: MyRequest<T>, res: Response): Promise<void> {
  }

  public async deleteMany(req: MyRequest<T[]>, res: Response): Promise<void> {
  }
}
