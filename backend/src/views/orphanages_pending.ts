import Orphanage from '../models/Orphanage';

export default {
  render(orphanage: Orphanage) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
    }
  },

  renderMany(orphanage: Orphanage[]) {
    return orphanage.map((orphanage) => this.render(orphanage))
  }
}