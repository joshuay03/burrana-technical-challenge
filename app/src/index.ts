import * as express from 'express';
import * as mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { useExpressServer } from 'routing-controllers';
import 'reflect-metadata';

/**
 * Class for application entry-point
 */
class App {
  public express = express.application;
  private port = 3000;

  constructor() {
    this.express = express();
    this.configureApp();
    this.startDBServer();
    // Register created express server in routing-controllers
    useExpressServer(this.express, {
      cors: true,
      controllers: [`${__dirname}/controllers/*.ts`],
    });
    this.express.listen(this.port);
  }

  /**
   * Method to configure express app
   */
  private configureApp(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
  }

  /**
   * Method to start MongoDB in-memory instance
   */
  private async startDBServer(): Promise<void> {
    const mongoServer = await MongoMemoryServer.create();
    const uri = await mongoServer.getUri();
    mongoose.connect(uri);
    // Close instance on SIGTERM
    process.on('SIGTERM', () => {
      mongoose.connection.close(false);
    });
  }
}


export default new App().express;
