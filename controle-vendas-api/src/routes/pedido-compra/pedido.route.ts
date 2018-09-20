  import { loadLocalDB, logger } from '../../services';
  import { NextFunction, Request, Response } from 'express';
  import { BaseRoute } from '../route';
  import * as Loki from 'lokijs';
  import * as jwt from 'jsonwebtoken';
  import * as REST from 'request-promise';
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
      this.router.post('/incluir', this.incluirItemCarrinho);
      this.router.post('/remover', this.removerItemCarrinho);
      this.router.post('/cancelar', this.cancelarPedido);
      this.router.post('/finalizar', this.encaminharPedidoCompra);
    }

    private async encaminharPedidoCompra (req: Request, res: Response, next: NextFunction) {
        REST.post({
          body : JSON.stringify(req.body),
          url : 'http://localhost:4000/api/pedido/venda-externa',
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

// (ao incluir o primeiro item salva na base um carrinho para o cliente)

/*

- finalizar pedido compra (finaliza o pedido de compra e envia pedido ap fornecedor para entrega )
- cancelar pedido
(lista pedidos realizados e a situação da entrega [consome serviço de situacao da entrega módulo #Fornecedor] )
- listar pedidos de compra


- incluir item no carrinho de compra; (ao incluir o primeiro item salva na base um carrinho para o cliente)
- remover item no carrinho de compra;
- finalizar pedido compra (finaliza o pedido de compra e envia pedido ap fornecedor para entrega )
- cancelar pedido
(lista pedidos realizados e a situação da entrega [consome serviço de situacao da entrega módulo #Fornecedor] )
- listar pedidos de compra

*/
