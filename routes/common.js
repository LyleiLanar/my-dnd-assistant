import { Router } from 'express';
import { getConvert, getHealth } from '../controllers/commons.js';

const routes = Router();

routes.get('/convert', getConvert);
routes.get('/health', getHealth);

export default routes;
