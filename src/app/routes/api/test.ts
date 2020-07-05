import {Router, Request, Response} from 'express';

const router = Router();

router.get(
    '/',
    (req: Request, res: Response, next: any) => {
      try {
        res.json('API is running!!!');
      } catch (err) { next(err); }
    },
);

module.exports = router;
