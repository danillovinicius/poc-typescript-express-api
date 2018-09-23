import { NextFunction, Request, Response } from 'express';
import * as requisition from 'request-promise';
import { BaseRoute } from '../route';

export class ProdutosRoute extends BaseRoute {

  public static path = '/produtos';
  private static instance: ProdutosRoute;

  private constructor () {
    super();
    this.listarProdutos = this.listarProdutos.bind(this);
    this.init();
  }

  static get router () {
    if (!ProdutosRoute.instance) {
      ProdutosRoute.instance = new ProdutosRoute();
    }
    return ProdutosRoute.instance.router;
  }

  private init () {
    this.router.get('/listar', this.listarProdutos);
  }

  private async listarProdutos (req: Request, res: Response, next: NextFunction) {
    requisition.get(`${this.ENDPOINT_FORNECEDOR_API}/produtos/listar`, (error, response, body) => {
      if (error) {
        res.status(500).send({ mensagem: 'Não foi possível obter a lista de produtos.' });
        return false;
      }
      res.status(200).json(JSON.parse(body));
    });
    return false;
  }
}
