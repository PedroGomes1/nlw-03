//Mostrar o que deve ser retornado na response dos controllers

import Images from '../models/Image';

export default {
  render(image: Images) {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`
    }
  },

  renderMany(images: Images[]) {
    return images.map((image) => this.render(image))
  }
}