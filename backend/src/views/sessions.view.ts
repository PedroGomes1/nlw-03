import Users from '../models/User';

interface SessionsProps {
  user: {
    id: number;
    name: string;
    email: string;
  }
  token: string;
}

export default {
  render(session: SessionsProps) {
    return {
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
      },
      token: session.token,
    }
  },
}