import { NextFunction, Request, Response } from 'express';
import * as Loki from 'lokijs';
import { loadLocalDB, logger } from '../../services';
import { BaseRoute } from '../route';
import { verifyJWT } from './../../services/verifyJWT';

const DB_NAME = 'fornecedordb.json';
const COLLECTION_NAME = 'produtos';
const db = new Loki(`../${DB_NAME}`, { persistenceMethod: 'fs' });

export class RelatorioRoute extends BaseRoute {

  public static path = '/relatorio';
  private static instance: RelatorioRoute;

  private constructor () {
    super();
    this.relatorioVendasPorPeriodo = this.relatorioVendasPorPeriodo.bind(this);
    this.relatorioProdutosMaisVendidos = this.relatorioProdutosMaisVendidos.bind(this);
    this.relatorioCustos = this.relatorioCustos.bind(this);
    this.init();
  }

  static get router () {
    if (!RelatorioRoute.instance) {
      RelatorioRoute.instance = new RelatorioRoute();
    }
    return RelatorioRoute.instance.router;
  }

  private init () {
    // TODO http://pdfkit.org/
    this.router.post('/vendas', verifyJWT, this.relatorioVendasPorPeriodo);
    this.router.post('/maisvendidos', verifyJWT, this.relatorioProdutosMaisVendidos);
    this.router.post('/custos', verifyJWT, this.relatorioCustos);
  }

  /**
  *
  */
  private async relatorioVendasPorPeriodo (req: Request, res: Response, next: NextFunction) {
    try {
      const col = await loadLocalDB(COLLECTION_NAME, db);
      res.send(col.data);
    } catch (err) {
      logger.error(err);
      res.sendStatus(400);
    }
  }

  /**
  *
  */
 private async relatorioProdutosMaisVendidos (req: Request, res: Response, next: NextFunction) {
    res.send({});
 }

/**
  *
  */
 private async relatorioCustos (req: Request, res: Response, next: NextFunction) {
    res.send({});
 }
  
}

