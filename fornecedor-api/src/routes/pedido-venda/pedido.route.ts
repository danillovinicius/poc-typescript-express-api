import { loadLocalDB, logger } from '../../services';
import { NextFunction, Request, Response } from 'express';
import { BaseRoute } from '../route';
import * as Loki from 'lokijs';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';

const DB_NAME = 'controlevendasdb.json';
const db = new Loki(`../${DB_NAME}`, { persistenceMethod: 'fs' });
const COLLECTION_NAME = 'cliente';

export class PedidoRoute extends BaseRoute {

  public static path = '/pedido';
  private static instance: PedidoRoute;

  private constructor () {
    super();
    this.realizarPedidoVenda = this.realizarPedidoVenda.bind(this);
    this.atualizarStatusPedido = this.atualizarStatusPedido.bind(this);
    this.consultarPedido = this.consultarPedido.bind(this);
    this.init();
  }

  static get router () {
    if (!PedidoRoute.instance) {
      PedidoRoute.instance = new PedidoRoute();
    }
    return PedidoRoute.instance.router;
  }

  private init () {
    // TODO repassar token valido na chamada do vendas para esse servico
    // TODO incluir validacao do jwt
    this.router.post('/venda-externa', this.realizarPedidoVenda);
    this.router.post('/atualizar-status', this.atualizarStatusPedido);
    this.router.post('/consultar', this.consultarPedido);
  }

  /**
   * Recebe um pedido externo de venda.
   * @param req 
   * @param res 
   * @param next 
   */
  private async realizarPedidoVenda (req: Request, res: Response, next: NextFunction) {
    try {
      //TODO - recebe pedido de venda. (Salva na base do fornecedor e grava codigo do pedido de compra(Venda) e pedido de venda(For))
      const col = await loadLocalDB(COLLECTION_NAME, db);
      const data = col.insert(req.body);
      db.saveDatabase();
      res.send({ id: data.$loki });
    } catch (err) {
      logger.error(err);
      res.sendStatus(400);
    }
  }

  /**
   * Atualiza a situação do pedido do cliente.
   * @param req 
   * @param res 
   * @param next 
   */
  private async atualizarStatusPedido (req: Request, res: Response, next: NextFunction) {
    try {
      //TODO implementar ...  (Pedido recebido, em separação de estoque, enviado, entregue)
      const col = await loadLocalDB(COLLECTION_NAME, db);
      const data = col.insert(req.body);
      db.saveDatabase();
      res.send({ id: data.$loki });
    } catch (err) {
      logger.error(err);
      res.sendStatus(400);
    }
  }

  /**
   * Consulta o pedido de um determinado cliente
   * @param req 
   * @param res 
   * @param next 
   */
  private async consultarPedido (req: Request, res: Response, next: NextFunction) {
    try {
      // TODO - consulta situacao de entrega do pedido
      // TODO filtrar id no token 
      const col = await loadLocalDB(COLLECTION_NAME, db);
      const data = col.insert(req.body);
      db.saveDatabase();
      res.send({ id: data.$loki });
    } catch (err) {
      logger.error(err);
      res.sendStatus(400);
    }
  }
}
