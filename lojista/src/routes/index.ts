import { logger } from '@/services';
import { NextFunction, Request, Response, Router } from 'express';
import { ListarProdutosRoute } from './lista-produtos/lista-produtos.route';
import { BaseRoute } from './route';
import { ClienteRoute } from './cliente/cliente.route';

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
    logger.info('[ApiRoute] Creating api routes.');
    this.router.get('/', this.get);
    this.router.use(ListarProdutosRoute.path, ListarProdutosRoute.router);
    this.router.use(ClienteRoute.path, ClienteRoute.router);
  }

  private async get (req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ online: true });
  }
}
