import Router, { Request, Response } from 'express';

const router = Router();
import { AdsController } from './controllers/AdsController';
import { GamesController } from './controllers/GamesController';
import { DiscordController } from './controllers/DiscordController';

router.get('/games', new GamesController().index);

router.post('/games/:id/ads', new AdsController().store);

router.get('/games/:id/ads', new AdsController().show);

router.get('/ads/:id/discord', new DiscordController().show);

export default router;
