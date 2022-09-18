import Router from 'express';

const router = Router();
import { AdsController } from './controllers/AdsController';
import { GamesController } from './controllers/GamesController';
import { DiscordController } from './controllers/DiscordController';
import { AuthController } from './controllers/AuthController';
import { UsersController } from './controllers/UsersController';
import { isAuthenticated } from './middlewares/isAuthenticated';

router.get('/games', isAuthenticated, new GamesController().index);
router.get('/games/:id/ads', isAuthenticated, new AdsController().show);
router.get('/profile', isAuthenticated, new UsersController().index);
router.get('/ads/:id/discord', isAuthenticated, new DiscordController().show);

router.post('/games/:id/ads', isAuthenticated, new AdsController().store);
router.post('/auth/register', new AuthController().auth);
router.post('/login', new AuthController().login);

export default router;
