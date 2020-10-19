import Users from '../models/User';

export default {
  render(user: Users) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password
    }
  },
}