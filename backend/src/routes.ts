import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticate from './middleware/EnsureAuthenticate';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import OrphanagesPendingController from './controllers/OrphanagesPendingController';
import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';
import ForgotPasswordController from './controllers/ForgotPasswordController';
import ResetPasswordController from './controllers/ResetPasswordController';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/orphanages', upload.array('images'), OrphanagesController.create)
routes.get('/orphanages/:id', OrphanagesController.show)
routes.get('/orphanages', OrphanagesController.index)


routes.get('/orphanages-pending', OrphanagesPendingController.index)

routes.post('/users', UsersController.store)
routes.post('/session', SessionsController.store)

routes.post('/forgot-password', ForgotPasswordController.store)
routes.post('/reset-password', ResetPasswordController.store)

export default routes;