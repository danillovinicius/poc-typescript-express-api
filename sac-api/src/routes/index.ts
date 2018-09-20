import { logger } from '@/services';
import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './route';
import { ChamadoRoute } from './chamado/chamado.route';

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
    logger.info('[CHAMADO] Creating api routes.');
    this.router.get('/', this.get);
    this.router.use(ChamadoRoute.path, ChamadoRoute.router);
  }

  private async get (req: Request, res: Response, next: NextFunction) {
    res.status(200).json({module: 'Chamado', online: true });
  }
}
