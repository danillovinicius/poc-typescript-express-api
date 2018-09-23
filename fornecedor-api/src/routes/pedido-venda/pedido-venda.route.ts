import { verifyJWT } from './../../services/verifyJWT';
import { NextFunction, Request, Response } from 'express';
import * as Locallydb from 'locallydb';
import { logger } from '../../services';
import { BaseRoute } from '../route';
import { Pedido } from 'models/pedido.model';

const db = new Locallydb('./fornecedor-db');
const clienteDB = db.collection('cliente');
const pedidoDB = db.collection('pedido');

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
    this.router.post('/venda-externa', verifyJWT, this.realizarPedidoVenda);
    this.router.post('/atualizar-status', verifyJWT, this.atualizarStatusPedido);
    this.router.get('/consultar', verifyJWT, this.consultarPedido);
  }

  /**
   * Recebe um pedido externo de venda.
   */
  private async realizarPedidoVenda (req: Request, res: Response, next: NextFunction) {
    try {
      let user = clienteDB.where({ usuario: req.body.usuario, senha: req.body.senha }).items;
      console.log('Usuario ', user);

      if (user && user[0]) {
        user = clienteDB.insert(req['user']);
        console.log('INSERINDO NOVO CLIENTE...', user.cid);
      }

      const total = req.body.map(i => i.valor).reduce((ac, it) => ac + it);
      console.log('Total Pedido', req.body);

      const pedido = pedidoDB.insert(new Pedido({
        time: new Date().getTime(),
        idCliente: user.cid,
        idClienteExterno: req['user'].cid,
        status: 'Pedido recebido',
        valor: total,
        items: req.body
      }));

      res.status(200).send({ mensagem: 'Pedido gravado com sucesso!' , pedido: pedido});
    } catch (err) {
      logger.error(err);
      res.sendStatus(400);
    }
  }

  /**
   * Atualiza a situação do pedido do cliente.
   * (Pedido recebido, em separação de estoque, enviado, entregue)
   */
  private async atualizarStatusPedido (req: Request, res: Response, next: NextFunction) {
    try {
      const pedido = pedidoDB.update(req.body.idPedido, { status: req.body.status });
      res.status(200).send({ mensagem: 'Pedido Atualizado com sucesso.', pedido: pedido });
    } catch (err) {
      logger.error(err);
      res.sendStatus(400);
    }
  }

  /**
   * Consulta o pedido de um determinado cliente
   */
  private async consultarPedido (req: Request, res: Response, next: NextFunction) {
    try {
      const clienteID = req['user'].cid;
      const pedidos = pedidoDB.where({'idClienteExterno': clienteID }).items;
      res.status(200).send(pedidos);
    } catch (err) {
      logger.error(err);
      res.sendStatus(400);
    }
  }
}
