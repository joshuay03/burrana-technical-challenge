import * as express from 'express';
import { router as indexRouter } from './routes/index';

class App {
  public express = express.application;
  private port = 3000;

  constructor() {
    this.express = express();
    this.express.use('/', indexRouter);
    this.express.listen(this.port);
  }
}

export default new App().express;
