import { getRepository } from 'typeorm';
import Users from '../models/User';
import bcryptHash from '../implementations/BCryptHashProvider';
import userView from '../views/users.view';
import { Request, Response } from 'express';

export default {

  async store(request: Request, response: Response) {

    const { name, email, password } = request.body; 

    const usersRepository = getRepository(Users);

    const checkUserExists = await usersRepository.findOne({
      where: {
        email,
      }
    })

    if(checkUserExists) {
      return response.status(400).json({ error: 'Usuário já cadastrado' })
    }

    const passwordHash = await bcryptHash.generateHash(password);
    
    const users = usersRepository.create({
      name,
      email,
      password: passwordHash
    })
    await usersRepository.save(users);

    return response.json(userView.render(users));

  },
}