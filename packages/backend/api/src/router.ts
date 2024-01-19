import express from 'express';

import authRouter from './auth/auth';
import { criteriaRouter } from './criteria/criteria-crud';
import { register } from './register';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/register', register);
router.use('/criteria', criteriaRouter);

export default router;
