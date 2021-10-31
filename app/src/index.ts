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
    this.startApp();
  }

  /**
   * Method to configure express app
   */
  private configureApp(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    // Register created express server in routing-controllers
    useExpressServer(this.express, {
      cors: true,
      controllers: [`${__dirname}/controllers/*.ts`],
    });
  }

  /**
   * Method to start MongoDB in-memory instance
   * and express server
   */
  private async startApp(): Promise<void> {
    console.log('Starting App...');
    console.log('Creating DB instance...');
    const mongoServer = await MongoMemoryServer.create();
    const uri = await mongoServer.getUri();
    await mongoose
      .connect(uri)
      .then(() => {
        console.log('Connected to DB!');
        this.express.listen(this.port, () => {
          console.log(`App is is listening on port ${this.port}...`);
        });
      })
    // Close instance on SIGTERM
    process.on('SIGTERM', () => {
      mongoose.connection.close(false);
    });
  }
}


export default new App().express;
