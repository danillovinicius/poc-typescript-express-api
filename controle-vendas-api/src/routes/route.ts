import { logger } from '@/services';
import * as config from 'config';
import { Router } from 'express';

const dbConfig = (name: string): any => config.get(`db.${name}`);

export abstract class BaseRoute {

  protected router = Router();
  protected connection: any = {};

  protected ENDPOINT_RELATORIO_API = 'http://localhost:4001/api';
  protected ENDPOINT_SAC_API = 'http://localhost:4002/api';
  protected ENDPOINT_FORNECEDOR_API = 'http://localhost:4000/api';

  public async connect (name: string): Promise<any> {
    return {};
  }

  public async disconnect (name: string): Promise<boolean> {
    try {
      return true;
    } catch (err) {
      logger.error('Error while disconnecting from database:', err);
      return false;
    }
  }
}
