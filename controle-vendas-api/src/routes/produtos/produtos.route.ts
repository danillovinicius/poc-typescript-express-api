import { verifyJWT } from './../../services/verifyJWT';
import { NextFunction, Request, Response } from 'express';
import * as REST from 'request-promise';
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
    this.router.get('/listar', verifyJWT, this.listarProdutos);
  }

  private async listarProdutos (req: Request, res: Response, next: NextFunction) {
    // TODO passar token para validar jwt do outro lado.
    // TODO olhar get domain (localhost) dinamico hard code
    // TODO melhorar response de erro ao consumir servico.
    // TODO necessidade de BaseRoute
    REST.get('http://localhost:5000/api/produtos/', (error, response, body) => {
      if (error) {
        return res.json(error);
      }
      res.json(JSON.parse(body));
    });
    return false;
  }
}