import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanagePendingView from '../views/orphanages_pending';
import { Request, Response } from 'express';

export default {

  async index(request: Request, response: Response) {

    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      where: {
        is_pending: true
      },
    });

    return response.json(orphanagePendingView.renderMany(orphanages));
  },
}
