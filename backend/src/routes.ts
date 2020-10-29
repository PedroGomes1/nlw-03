import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticate from './middleware/EnsureAuthenticate';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';
import ForgotPasswordController from './controllers/ForgotPasswordController';
import ResetPasswordController from './controllers/ResetPasswordController';
import OrphanageImagesController from './controllers/OrphanageImagesController';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/orphanages', upload.array('images'), OrphanagesController.create)
routes.post('/orphanages-images', upload.single('images'), OrphanageImagesController.create) // Para atualização de imagens 
routes.put('/orphanages/:idOrphanage', OrphanagesController.update)
routes.get('/orphanages/:id', OrphanagesController.show)
routes.get('/orphanages', OrphanagesController.index)
routes.delete('/orphanages/:idOrphanage', OrphanagesController.delete)

routes.post('/users', UsersController.store)
routes.post('/session', SessionsController.store)

routes.post('/forgot-password', ForgotPasswordController.store)
routes.post('/reset-password', ResetPasswordController.store)

routes.delete('/orphanage/:idImage', OrphanageImagesController.delete);

export default routes;