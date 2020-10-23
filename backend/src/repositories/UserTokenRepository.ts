import { getRepository } from 'typeorm';

import UserToken from '../models/UserToken';

class UserTokenRepository {

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userTokenRepository = getRepository(UserToken);

    const userToken = userTokenRepository.findOne({
      where: {
        token,
      }
    })

    return userToken;

  }

  public async generateToken(user_id: number): Promise<UserToken> {

    const userTokenRepository = getRepository(UserToken);

    const userToken = userTokenRepository.create({ //token já é gerado pelo model
      user_id,
    });

    await userTokenRepository.save(userToken);

    return userToken;
  }
}

export default new UserTokenRepository();