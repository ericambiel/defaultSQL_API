
import * as path from 'path';

import routes from './app/routes/index';
import ConsoleLog from './libs/ConsoleLog';

import createError = require('http-errors');
import cookieParser = require('cookie-parser');
import express = require('express');
// const cors = require('cors')

// Load environment configuration
require('dotenv-safe').config();
// config({ // Caso queira especificar o local e nome doas arquivos
//   path: path.resolve(__dirname, '../../..', '.env'),
//   example: path.resolve(__dirname, '../../..', '.env.example'),
// });


export default class App {
  public server: express.Express;
  public debug: ConsoleLog;

  constructor() {
    this.debug = new ConsoleLog('debug:start');
    this.server = express();

    this.setup();
  }

  setup() {
    try {
      new ConsoleLog('info:start').printConsole('Starting API...');

      this.routes();
      this.setupViews();
      this.middleware();

      new ConsoleLog('info:start').printConsole('API has been started.');
    } catch (err) {
      new ConsoleLog('error:start').printConsole(`An exception was thrown during API initialization. ${err.message}`);
    }
  }

  private setupViews() {
    this.debug.printConsole('Starting Views...');
    this.server.set('views', path.join(__dirname, 'views'));
    this.server.set('view engine', 'pug');
  }

  // Onde será configurado nossas rotas
  private routes() {
    this.debug.printConsole('Starting Routes...');
    this.server.use(routes);
    // this.server.use('/', routes);
  }

  // Se ocorrerá algum tipo de middleware na aplicação
  private middleware() {
    this.debug.printConsole('Starting Middlewares...');
      // this.server.use(cors())
    this.server.use(express.json());
    this.server.use(express.urlencoded({extended: false}));
    this.server.use(express.static(path.join(__dirname, 'public')));
    this.server.use(cookieParser());

    // catch 404 and forward to error handler
    this.server.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      next(createError(404));
    });

    // error handler
    this.server.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
  }
}
