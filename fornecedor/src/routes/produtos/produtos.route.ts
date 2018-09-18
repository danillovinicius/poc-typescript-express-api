import { logger } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { BaseRoute } from '../route';

export class ProdutosRoute extends BaseRoute {

  public static path = '/produtos';
  private static instance: ProdutosRoute;

  private constructor () {
    super();
    this.produtos = this.produtos.bind(this);
    this.init();
  }

  static get router () {
    if (!ProdutosRoute.instance) {
      ProdutosRoute.instance = new ProdutosRoute();
    }
    return ProdutosRoute.instance.router;
  }

  private init () {
    this.router.get('/', this.produtos);
  }

  private async produtos (req: Request, res: Response, next: NextFunction) {

    logger.info('Rest... produtos...');

    const produtos = [
      {nome: 'Xbox 360', valor: 600.00, qtDisponivel: 5},
      {nome: 'Xbox One', valor: 4000.99, qtDisponivel: 5},
      {nome: 'Xbox', valor: 1000.99, qtDisponivel: 5},
      {nome: 'Play Statiton', valor: 4000.99, qtDisponivel: 0},
    ];
    res.json(produtos);
    next();
  }
}
