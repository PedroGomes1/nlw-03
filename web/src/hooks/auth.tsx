import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Happy:token');
    const user = localStorage.getItem('@Happy:user');

    if(token && user) {
      api.defaults.headers.Authorization = `Bearer ${token}`
      return { token, user: JSON.parse(user)};
    } 

    return {} as AuthState
  })


  const signIn = useCallback(async ({ email, password}) => {
    const response = await api.post('/session', {
      email,
      password,
    })
    const { token, user } = response.data;
    
    api.defaults.headers.Authorization = `Bearer ${token}`

    localStorage.setItem('@Happy:token', token);
    localStorage.setItem('@Happy:user', JSON.stringify(user));

    setData({ token, user })

  }, [])

  const signOut = useCallback(() => {

    localStorage.removeItem('@Happy:token')
    localStorage.removeItem('@Happy:user')

    setData({} as AuthState);
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
    )
  }

  export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if(!context) {
      throw new Error('useAuth must be a used within an AuthProvider');
    }

    return context;
  }