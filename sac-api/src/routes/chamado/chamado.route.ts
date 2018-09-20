import { NextFunction, Request, Response } from 'express';
import * as Loki from 'lokijs';
import { loadLocalDB, logger } from '../../services';
import { BaseRoute } from '../route';
import { verifyJWT } from './../../services/verifyJWT';

const DB_NAME = 'chamadodb.json';
const COLLECTION_NAME = 'chamado';
const db = new Loki(`../${DB_NAME}`, { persistenceMethod: 'fs' });

export class ChamadoRoute extends BaseRoute {

  public static path = '/chamado';
  private static instance: ChamadoRoute;

  private constructor () {
    super();
    this.registrarNovoChamado = this.registrarNovoChamado.bind(this);
    this.listarChamados = this.listarChamados.bind(this);
    this.incluirHistoricoNoChamado = this.incluirHistoricoNoChamado.bind(this);
    this.atualizarSituacaoChamado = this.atualizarSituacaoChamado.bind(this);
    this.init();
  }

  static get router () {
    if (!ChamadoRoute.instance) {
      ChamadoRoute.instance = new ChamadoRoute();
    }
    return ChamadoRoute.instance.router;
  }

  private init () {
    this.router.post('/registrar', verifyJWT, this.registrarNovoChamado);
    this.router.get('/listar', verifyJWT, this.listarChamados);
    this.router.get('/andamento', verifyJWT, this.incluirHistoricoNoChamado);
    this.router.get('/atualizar', verifyJWT, this.atualizarSituacaoChamado);
  }

 /**
  * Inclui um novo chamado dado um cliente logado.
  */
  private async registrarNovoChamado (req: Request, res: Response, next: NextFunction) {
    try {
      // TODO get id do usuario jwt e setar no chamado
      // TODO setar informações no Chamado e salvar
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
  * Lista os chamados do cliente logado.
  */
  private async listarChamados (req: Request, res: Response, next: NextFunction) {
    try {
      // TODO filtrar por id do usuario da requisicao
      const col = await loadLocalDB(COLLECTION_NAME, db);
      res.send(col.data);
    } catch (err) {
      logger.error(err);
      res.sendStatus(400);
    }
  }

 /**
  * inclui um historico de conversação entre o atendente e o cliente no chamado
  */
  private async incluirHistoricoNoChamado (req: Request, res: Response, next: NextFunction) {
    // TODO Inclui Na coleção de historico HistoricoChamado o novo historico com o id do chamado vinculado
    res.send({});
  }

  /**
   * Atualiza a situação do chamado (Solucionado(Loja), Respondido, Fechado (Cliente))
   */
  private async atualizarSituacaoChamado (req: Request, res: Response, next: NextFunction) {
    // TODO get Chamado by id e atualiza situacao 
    res.send({});
  }
}
