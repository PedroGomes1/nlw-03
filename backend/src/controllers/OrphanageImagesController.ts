import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Images from '../models/Image';

export default {

  async delete(request: Request, response: Response) {

    const { idImage } = request.params;

    const imageRepository = getRepository(Images);

    const image = await imageRepository.findOne(idImage);

    if(!image) {
      return response.status(400).json({ error: 'Image not found' })
    }

    await imageRepository.delete(image);

    return response.status(204).json();
  },

  async create(request: Request, response: Response) {

    const { orphanage_id } = request.body;

    const imageRepository = getRepository(Images);

    const requestImages = request.file;
    
    const data = {
      orphanage: orphanage_id,
      path: requestImages.filename
    }
    
      const orphanageImage = imageRepository.create(data)

      await imageRepository.save(orphanageImage); 
     

    return response.json(orphanageImage);
  }
}