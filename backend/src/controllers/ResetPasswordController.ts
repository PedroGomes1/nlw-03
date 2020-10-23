import { getRepository } from 'typeorm';
import userTokensRepository from '../repositories/UserTokenRepository';
import BCryptHashProvider from '../implementations/BCryptHashProvider';
import User from '../models/User';
import { addHours, isAfter } from 'date-fns';
import { Request, Response } from 'express';

export default {

  async store(request: Request, response: Response) {
    const { password, token } = request.body; 

    const userRepository = getRepository(User);

    const userToken = await userTokensRepository.findByToken(token);

    if(!userToken) {
      return response.status(400).json('Token invalid');
    }

    const user = await userRepository.findOne(userToken.user_id);
    
    if(!user) {
      return response.status(400).json('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if(isAfter(Date.now(), compareDate)) {
      return response.status(400).json('Token expired');
    }
    
    user.password = await BCryptHashProvider.generateHash(password)

    await userRepository.save(user)

    return response.status(204).json();
  },
}