import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import Users from '../models/User';
import bcryptHash from '../implementations/BCryptHashProvider';
import authConfig from '../config/auth';
import sessionsView from '../views/sessions.view';
import { Request, Response } from 'express';

export default {

  async store(request: Request, response: Response) {

    const { email, password } = request.body; 

    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne({
      where: {
        email,
      }
    })

    if(!user) {
      return response.status(400).json({ error: 'Incorrect email/password combinations' })
    }

    const passwordMatch = await bcryptHash.compareHash(password, user.password);
    
    if(!passwordMatch) {
      return response.status(400).json({ error: 'Incorrect email/password combinations' })
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    const data = { token, user };

    return response.json(sessionsView.render(data));

  },
}