import express from 'express';

import authRouter from './auth/auth';
import { criteriaRouter } from './criteria/criteria-crud';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/criteria', criteriaRouter);

export default router;
