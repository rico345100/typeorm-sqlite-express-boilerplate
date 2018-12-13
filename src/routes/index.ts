import * as express from 'express';
import TestRouter from './Test';

const router = express.Router();

router.get('/', (ctx, next) => {
	ctx.body = 'Helloworld';
});

router.use('/test', TestRouter);

export default router;