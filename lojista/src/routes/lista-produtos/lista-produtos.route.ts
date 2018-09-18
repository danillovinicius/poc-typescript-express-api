import { logger } from '@/services';
import { NextFunction, Request, Response } from 'express';
import * as REST from 'request-promise';
import { BaseRoute } from '../route';

export class ListarProdutosRoute extends BaseRoute {

  public static path = '/listar-produtos';
  private static instance: ListarProdutosRoute;

  private constructor () {
    super();
    this.listarProdutos = this.listarProdutos.bind(this);
    this.init();
  }

  static get router () {
    if (!ListarProdutosRoute.instance) {
      ListarProdutosRoute.instance = new ListarProdutosRoute();
    }
    return ListarProdutosRoute.instance.router;
  }

  private init () {
    this.router.get('/', this.listarProdutos);
  }

  private async listarProdutos (req: Request, res: Response, next: NextFunction) {
    REST.get('http://localhost:5000/api/produtos/', (error, response, body) => {
      if (error) {
        return res.json(error);
      }
      res.json(JSON.parse(body));
    });
    return false;
  }

  private async encaminharPedidoCompra (req: Request, res: Response, next: NextFunction) {
    REST.post({
      body : JSON.stringify({'firstname': 'Nicanor'}),
      url : 'http://httpbin.org/post',
      headers : { 'content-type': 'application/json' },
    }, (error, response, body) => {
        if (error) {
          return res.json(error);
        }
        res.json(JSON.parse(body));
    });
    return false;
  }

}
