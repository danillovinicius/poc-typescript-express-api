import { logger } from '../../services';
import { NextFunction, Request, Response } from 'express';
import { BaseRoute } from '../route';
import * as Locallydb from 'locallydb';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';

const db = new Locallydb('./controle-vendas-db');
const collection = db.collection('cliente');

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

  private async login (req: Request, res: Response, next: NextFunction) {
    try {
      const user = collection.where({ usuario: req.body.usuario, senha: req.body.senha }).items;

      if (user && user[0]) {
        const token = jwt.sign({ user: user[0] }, config.get('secret'), { expiresIn: '500h' });
        res.status(200).send({ mensagem: 'Login realizado com sucesso!', auth: true, token: token });
      } else {
        res.status(500).send({ mensagem: 'Login inválido!' });
      }

    } catch (err) {
      logger.error(err);
      res.status(500).send({ mensagem: 'Erro ao realizar o login' });
    }
  }

  private async cadastrarCliente (req: Request, res: Response, next: NextFunction) {
    try {

      if (this.hasCamposObrigatoriosVazio(req)) {
        res.status(500).send({ mensagem: 'Os campos obrigatórios devem ser preenchidos!' });
        return false;
      }

      const user = collection.where({usuario: req.body.usuario }).items;

      if (user && !user[0]) {
        collection.insert(req.body);
        res.status(200).send({ mensagem: `Usuário cadastrado com sucesso!` });
      } else {
        res.status(500).send({ mensagem: 'O login já esta sendo utilizado.' });
      }
    } catch (err) {
      res.status(500).send({ mensagem: `${err}` });
    }
  }

  private hasCamposObrigatoriosVazio (req: Request): boolean {
    return (!req.body.nome || !req.body.usuario || !req.body.senha);
  }
}
