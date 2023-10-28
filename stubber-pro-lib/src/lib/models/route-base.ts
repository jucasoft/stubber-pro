import * as express from 'express';
import { BaseController } from './crud-controller-base';

export class BaseRoute<T> {
  router = express.Router();
  constructor(controller: BaseController<T>) {
    this.router.post(`/search`, controller.search);
    this.router.post(`/select`, controller.select);
    this.router.post(`/create`, controller.create);
    this.router.post(`/createMany`, controller.createMany);
    this.router.post(`/update`, controller.update);
    this.router.post(`/updateMany`, controller.updateMany);
    this.router.post(`/delete`, controller.delete);
    this.router.post(`/deleteMany`, controller.deleteMany);
  }

  getRouter() {
    return this.router;
  }
}
