import jwt from 'jsonwebtoken';
import cookie from 'cookie-parser';
import { Request, Response, NextFunction } from 'express';
import 'dotenv/config'
import { UserRepository } from '../repositories/UserRepository';

const loginrequired = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['access-token'];
    if (token){
        const validatetoken = await jwt.verify(token, process.env.SECRET);

        if (validatetoken){    
            //res.user = validatetoken.id;
            next()
        } else {            
            //res.redirect('/login')
            return res.status(401).json( { message: `Token expires`})
        }
    } else {        
        //res.redirect('/login')
        return res.status(404).json({ message: `Token not found`})
    }    
}

const verifyEmail = async ( req : Request, res : Response, next : NextFunction) => {
    const email = req.body.email;
    const user = await UserRepository.findOne({where: {email} })

    if (user){
        if (user.status == 1){
            next()
        } else {
            res.status(404).json({ message : `Please, confirme you email`})
        }        
    } else {
        next();
    }    
}

export { loginrequired, verifyEmail }