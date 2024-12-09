import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react'

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    checkLoginStatus();
  }, [])

  const checkLoginStatus = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('access_token');
      setIsLoggedIn(!!storedToken);
      setToken(storedToken);
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  }

  const login = async (accessToken: string) => {
    try {
      await AsyncStorage.setItem('access_token', accessToken);
      setIsLoggedIn(true);
      setToken(accessToken);
    } catch (error) {
      console.error("Error storing token:", error);
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      setIsLoggedIn(false);
      setToken(null);
    } catch (error) {
      console.error("Error removing token:", error);
    }
  }

  return { isLoggedIn, token, login, logout }
}