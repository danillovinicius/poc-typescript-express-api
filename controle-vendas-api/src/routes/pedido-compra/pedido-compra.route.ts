import { verifyJWT } from './../../services/verifyJWT';
import { logger } from '../../services';
import { NextFunction, Request, Response } from 'express';
import { BaseRoute } from '../route';
import * as Locallydb from 'locallydb';
import * as requisition from 'request-promise';
import { Produto } from 'models/produto.model';

const db = new Locallydb('./controle-vendas-db');
const carrinhoDB = db.collection('carrinho');

export class PedidoRoute extends BaseRoute {

  public static path = '/pedido';
  private static instance: PedidoRoute;

  private constructor () {
    super();
    this.listarCarrinhoCompra = this.listarCarrinhoCompra.bind(this);
    this.listarPedidosCompra = this.listarPedidosCompra.bind(this);
    this.incluirItemCarrinho = this.incluirItemCarrinho.bind(this);
    this.removerItemCarrinho = this.removerItemCarrinho.bind(this);
    this.cancelarPedido = this.cancelarPedido.bind(this);
    this.encaminharPedidoCompra = this.encaminharPedidoCompra.bind(this);
    this.init();
  }

  static get router () {
    if (!PedidoRoute.instance) {
      PedidoRoute.instance = new PedidoRoute();
    }
    return PedidoRoute.instance.router;
  }

  private init () {
    this.router.get('/carrinho', verifyJWT, this.listarCarrinhoCompra);
    this.router.post('/incluir', verifyJWT, this.incluirItemCarrinho);
    this.router.post('/remover', verifyJWT, this.removerItemCarrinho);
    this.router.post('/cancelar', verifyJWT, this.cancelarPedido);
    this.router.post('/finalizar', verifyJWT, this.encaminharPedidoCompra);
    this.router.get('/listar', verifyJWT, this.listarPedidosCompra);
  }

  private async incluirItemCarrinho (req: Request, res: Response, next: NextFunction) {
    try {
      requisition.post({
        body: { id: req.body.id },
        url: `${this.ENDPOINT_FORNECEDOR_API}/produtos/id`,
        json: true
      }, (error, response, body) => {

        if (body[0] && body[0].id) {

          const data = carrinhoDB.insert({
            time: new Date().getTime(),
            clienteID: req['user'].cid,
            produto: body[0]
          });

          res.status(200).send({ item: data });
        } else {
          res.status(500).send({ mensagem: 'ID do produto é inválido' });
        }

      });
    } catch (err) {
      logger.error(err);
      res.status(500).send({ mensagem: 'Erro ao incluir produto no carrinho.' });
    }

    return false;
  }

  private async removerItemCarrinho (req: Request, res: Response, next: NextFunction) {
    const clienteID = req['user'].cid;
    const item = carrinhoDB.where({'clienteID': clienteID , 'cid': req.body.id }).items;

    if (item && item[0]) {
      carrinhoDB.remove(req.body.id);
      res.status(200).send({ mensagem: 'Item removido' });
    } else {
      res.status(200).send({ mensagem: 'Nào foi possível remover o item do carrinho' });
    }

    return false;
  }

  private async listarCarrinhoCompra (req: Request, res: Response, next: NextFunction) {
    const clienteID = req['user'].cid;
    const carrinho = carrinhoDB.where({'clienteID': clienteID }).items;
    const produtos: Produto[] = [];

    if (carrinho && carrinho[0]) {
      carrinho.forEach(element => {
        const produto = new Produto(element.produto);
        produto.index = element.cid;
        produtos.push(produto);
      });
    }
    res.status(200).send(produtos);
    next();
  }

  private async encaminharPedidoCompra (req: Request, res: Response, next: NextFunction) {

    const carrinho = carrinhoDB.where({'clienteID': req['user'].cid }).items;
    const produtos = carrinho.map( element => element.produto );

    requisition.post({
        body: JSON.stringify(produtos),
        url: `${this.ENDPOINT_FORNECEDOR_API}/pedido/venda-externa`,
        headers: {
          'content-type': 'application/json',
          'authorization': req.headers['authorization'],
        }
      }, (error, response, body) => {

        if (error) {
          return res.status(500).send({ mensagem: 'Não foi possível realizar pedido' });
        } else {
          carrinho.forEach(element => {
            carrinhoDB.remove(element.cid);
          });
        }

        res.status(200).json(JSON.parse(body));
        next();
      }
    );
    return false;
  }

  private async cancelarPedido (req: Request, res: Response, next: NextFunction) {
    requisition.post({
      body: JSON.stringify({ idPedido: req.body.id, status: 'Pedido cancelado'}),
      url: `${this.ENDPOINT_FORNECEDOR_API}/pedido/atualizar-status`,
      headers: {
        'content-type': 'application/json',
        'authorization': req.headers['authorization'],
      }
    }, (error, response, body) => {
      if (error) return res.status(500).send({ mensagem: 'Não foi possível realizar pedido' });
      res.status(200).json(JSON.parse(body));
      next();
    });

    return false;
  }

  private async listarPedidosCompra (req: Request, res: Response, next: NextFunction) {
    requisition.get({
      url: `${this.ENDPOINT_FORNECEDOR_API}/pedido/consultar`,
      headers: {
        'content-type': 'application/json',
        'authorization': req.headers['authorization'],
        }
      }, (error, response, body) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ mensagem: 'Não foi possível obter a lista de pedidos' });
        }
        res.status(200).json(JSON.parse(body));
      }
    );
    return false;
  }
}
