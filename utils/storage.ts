import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthTokens } from '../types/auth';

export const storeTokens = async (tokens: AuthTokens): Promise<void> => {
  try {
    if (!tokens.access_token || !tokens.refresh_token || !tokens.token_type) {
      throw new Error('Invalid token data');
    }
    await AsyncStorage.multiSet([
      ['access_token', tokens.access_token],
      ['refresh_token', tokens.refresh_token],
      ['token_type', tokens.token_type],
    ]);
  } catch (error) {
    console.error('Token storage error:', error);
    throw error;
  }
}