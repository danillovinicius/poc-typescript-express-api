import { loadLocalDB, logger } from '../../services';
import { NextFunction, Request, Response } from 'express';
import { BaseRoute } from '../route';
import * as Loki from 'lokijs';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import { Cliente } from 'models/cliente.model';

const DB_NAME = 'db.json';
const db = new Loki(`../${DB_NAME}`, { persistenceMethod: 'fs' });
const COLLECTION_NAME = 'cliente';

export class ClienteRoute extends BaseRoute {

  public static path = '/cliente';
  private static instance: ClienteRoute;

  private constructor () {
    super();
    this.cadastrarCliente = this.cadastrarCliente.bind(this);
    this.init();
  }

  static get router () {
    if (!ClienteRoute.instance) {
      ClienteRoute.instance = new ClienteRoute();
    }
    return ClienteRoute.instance.router;
  }

  private init () {
    this.router.post('/cadastro', this.cadastrarCliente);
    this.router.post('/login', this.login);
  }

// https://github.com/techfort/LokiJS/wiki/Query-Examples
  private async login (req: Request, res: Response, next: NextFunction) {
    try {
      const coll = await loadLocalDB(COLLECTION_NAME, db);
      const results = coll.find({
        'usuario': { '$eq' : req.body.usuario },
        'senha': { '$eq' : req.body.senha },
      });

      if (results) {
        const token = jwt.sign({ id: (results[0] as Cliente).id }, config.get('secret'), {
          expiresIn: 1800 // 30min
        });
        res.status(200).send({ auth: true, token: token });
      } else {
        res.status(500).send('Login inválido!');
      }

    } catch (err) {
      logger.error(err);
      res.status(500).send('Erro ao realizar o login');
    }
  }

  private async cadastrarCliente (req: Request, res: Response, next: NextFunction) {
    try {
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
