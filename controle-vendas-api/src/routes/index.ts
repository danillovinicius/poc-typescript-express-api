import { logger } from '@/services';
import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './route';
import { ClienteRoute } from './cliente/cliente.route';
import { ProdutosRoute } from './produtos/produtos.route';
import { PedidoRoute } from './pedido-compra/pedido-compra.route';

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
    this.router.get('/', this.get);
    this.router.use(ProdutosRoute.path, ProdutosRoute.router);
    this.router.use(PedidoRoute.path, PedidoRoute.router);
    this.router.use(ClienteRoute.path, ClienteRoute.router);
    logger.info('[API VENDAS] it`s running.');
  }

  private async get (req: Request, res: Response, next: NextFunction) {
    res.status(200).json({module: 'Controle de Vendas', online: true });
  }
}
