import { logger } from '@/services';
import { NextFunction, Request, Response, Router } from 'express';
import { ProdutosRoute } from './produtos/produtos.route';
import { BaseRoute } from './route';

export class ApiRoutes extends BaseRoute {
  public static path = '/api';
  private static instance: ApiRoutes;

  private constructor () {
    super();
    this.get = this.get.bind(this);
    this.init();
  }

  static get router (): Router {
    if (!ApiRoutes.instance) {
      ApiRoutes.instance = new ApiRoutes();
    }
    return ApiRoutes.instance.router;
  }

  private init () {
    // log
    logger.info('[ApiRoute] Creating api routes.');
    this.router.get('/', this.get);
    this.router.use(ProdutosRoute.path, ProdutosRoute.router);
  }

  private async get (req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ online: true });
  }
}
