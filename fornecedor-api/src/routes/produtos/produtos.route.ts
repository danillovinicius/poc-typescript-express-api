import { NextFunction, Request, Response } from 'express';
import { BaseRoute } from '../route';
import { Produto } from 'models/produto.model';

export class ProdutosRoute extends BaseRoute {
  public static path = '/produtos';
  private static instance: ProdutosRoute;

  private constructor () {
    super();
    this.produtos = this.produtos.bind(this);
    this.obterPorId = this.obterPorId.bind(this);
    this.init();
  }

  static get router () {
    if (!ProdutosRoute.instance) {
      ProdutosRoute.instance = new ProdutosRoute();
    }
    return ProdutosRoute.instance.router;
  }

  private init () {
    this.router.get('/listar', this.produtos);
    this.router.post('/id', this.obterPorId);
  }

  private async produtos (req: Request, res: Response, next: NextFunction) {
    res.json(this.getProdutos());
    next();
  }

  private async obterPorId (req: Request, res: Response, next: NextFunction) {
    res.json(this.getProdutos().filter(item => item.id === req.body.id));
    next();
  }

  private getProdutos (): Produto[] {
    return [] as Produto[];
  }
}
