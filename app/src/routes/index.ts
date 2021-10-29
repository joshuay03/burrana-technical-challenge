import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/', get);

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    res.send('testing');
  } catch (err: any) {
    console.log('err', err);
    next(err);
  }
}

export { router };
