import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import  bcrypt  from 'bcrypt';
import crypto from 'crypto';
import cookie from 'cookie-parser';
import nodemailer from 'nodemailer';
import 'dotenv/config'

// mail sender details
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASS_EMAIL
    },
  });

class UserController {
    async store( req: Request, res: Response) {
        const {
            name,
            dt_nascimento,
            email,
            password,
            cellphone,
            whatsapp,
            phone,
            cep,
            adress,
            level,
            status
        } = req.body;

        const userExists = await UserRepository.findOne( { where: { email } })

        if (userExists){
            return res.status(409).json( {message: `E-mail já cadastrado`})
        }

        const salt    = await bcrypt.genSalt(12);
        const newPass = await bcrypt.hash(password, salt);

        try {
            const user = await UserRepository.create({
                name,
                dt_nascimento,
                email,
                password: newPass,
                emailToken: crypto.randomBytes(64).toString('hex'),
                cellphone,
                whatsapp,
                phone,
                cep,
                adress,
                level,
                status : 0
            })
            await UserRepository.save(user);  
            
            //send verification mail to user
            var mailOptions = {
                from: `"Verify your email" <${process.env.USER_EMAIL}>`,
                to: user.email,
                subject: `codewithsid - verify your email`,
                html: `<h2> ${user.name}! Thank's for registering on our site </h2>
                       <h4> Please, verify your mail to continue ...</h4>
                       <a href="http://${req.headers.host}/user/verify-email?emailToken=${user.emailToken}"> Verify your Email </a>` 
            }

            //sending email

            try {
                await transport.sendMail(mailOptions);
                return res.status(201).json( {message: `Usuário Cadastrado com sucesso`})
            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: `Erro no servidor, tente novamente mais tarde!`});
                
            } 
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: `Erro no servidor, tente novamente mais tarde!`});
        }   
        
    }
    async busca(req: Request, res: Response) {
        const email = req.params.email;

        const user = await UserRepository.findOne( { where: { email } })

        if (user){
            console.log(user)
            return res.status(200).json(user)
        }

        return res.status(404).json({ message: `Usuário não encontrado`})
    }
}

export default new UserController()