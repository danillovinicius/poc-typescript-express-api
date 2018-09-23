import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as errorHandler from 'errorhandler';
import * as express from 'express';
import * as expressStatusMonitor from 'express-status-monitor';
import * as helmet from 'helmet';
import * as methodOverride from 'method-override';
import * as morgan from 'morgan';
import * as path from 'path';

import { ApiRoutes } from './routes';
import { logger } from './services';

export class Server {

  public static bootstrap (): Server {
    return new Server();
  }

  public app: express.Application;

  constructor () {
    this.app = express();
    this.config();
    this.routes();
  }

  public config () {
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(morgan('tiny', {
      stream: {
        write: (message: string) => logger.info(message.trim()),
      },
    } as morgan.Options));
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({
      extended: true,
    }));

    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(methodOverride());
    this.app.use(expressStatusMonitor());
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      err.status = 404;
      next(err);
    });
    this.app.use(errorHandler());
  }

  private routes () {
    this.app.use(ApiRoutes.path, ApiRoutes.router);
  }
}
