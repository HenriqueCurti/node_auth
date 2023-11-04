import { body, validationResult } from 'express-validator';
import express from 'express';
const router = express.Router();
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';
import { loginrequired, verifyEmail } from '../config/JWT';

router.get('/teste', (req, res) => {
    return res.status(200).json({message: `Bem vindo ao PetShop`})
})

router.post('/users', UserController.store )                      // User Create
router.get('/users/:id', loginrequired, UserController.busca)     // User Find

router.post('/login', verifyEmail, AuthController.login);         // User Auth
router.get('/logout', AuthController.logout)                      // User Auth
router.get('/user/verify-email', AuthController.verifyemail)      // User Auth

export default router