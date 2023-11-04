import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import  bcrypt  from 'bcrypt';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import cookie from 'cookie-parser';


class AuthController {
    // Login
    async login( req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await UserRepository.findOne( { where: { email } });

        if (!user){
            return res.status(401).json({ Message: `E-mail não cadastrado`});
        }

        const isValidPass = await bcrypt.compare(password, user.password);

        if (!isValidPass){
            return res.status(401).json({ Message: `Acesso Negado`});
        }

        const token = jwt.sign({ id: user.id}, process.env.SECRET, { expiresIn: '1d'})

        res.cookie('access-token', token);
        return res.status(200).json( {message: `Acesso liberado`,
                                        'Token': token})
    }

    // Logout
    async logout( req: Request, res: Response) {
        res.cookie('access-token', '', { maxAge: 1})
    }

    //Verify Email
    async verifyemail( req: Request, res: Response) {
        try {
            const emailToken = req.query;
            if (emailToken){
                const user = await UserRepository.findOne({where : emailToken})
                if (user){
                    user.emailToken = null;
                    user.status     = 1;
                    await UserRepository.save(user);
                    return res.status(201).json({message: `Account actived! `}); }
            }
            return res.status(404).json({ message: `Actived link was invalid`})
            
        } catch (error) {
            console.log(error)
        }

    }
}

export default new AuthController()