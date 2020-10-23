import { getRepository } from 'typeorm';
import userTokensRepository from '../repositories/UserTokenRepository';
import Users from '../models/User';
import path from 'path';
import { Request, Response } from 'express';
import etherealMail from '../config/mail';

export default {

  async store(request: Request, response: Response) {

    const { email } = request.body; 

    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne({
      where: {
        email,
      }
    })

    if(!user) {
      return response.status(400).json({ error: 'Usuário não encontrado' })
    }

      const { token } = await userTokensRepository.generateToken(user.id);
     
    
    const pathForgotPasswordTemplateEmail = path.resolve(
      __dirname,
      '..',
      'views',
      'templates',
      'forgot_password.hbs'
    )
    await etherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      from: {
        name: 'Happy',
        email: process.env.SMTP_USER || ''
      },
      subject: 'Happy - Recuperação de senha',
      templateData: {
        file: pathForgotPasswordTemplateEmail,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    })
    
    await usersRepository.save(user)

    return response.status(204).json();
  },
}