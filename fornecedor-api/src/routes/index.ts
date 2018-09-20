import { logger } from '@/services';
import { NextFunction, Request, Response, Router } from 'express';
import { ProdutosRoute } from './produtos/produtos.route';
import { BaseRoute } from './route';
import { PedidoRoute } from './pedido-venda/pedido.route';

export class ApiRoutes extends BaseRoute {
  public static path = '/api';
  private static instance: ApiRoutes;

  private constructor () {
    super();
    this.health = this.health.bind(this);
    this.init();
  }

  static get router (): Router {
    if (!ApiRoutes.instance) {
      ApiRoutes.instance = new ApiRoutes();
    }
    return ApiRoutes.instance.router;
  }

  private init () {
    logger.info('[FORNECEDOR] Creating api routes.');
    this.router.get('/', this.health);
    this.router.use(ProdutosRoute.path, ProdutosRoute.router);
    this.router.use(PedidoRoute.path, PedidoRoute.router);
  }

  private async health (req: Request, res: Response, next: NextFunction) {
    res.status(200).json({module: 'Fornecedor', online: true });
  }
}
