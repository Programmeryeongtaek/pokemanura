import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthTokens } from '../types/auth';

export const storeTokens = async (tokens: AuthTokens): Promise<void> => {
  try {
    await AsyncStorage.multiSet([
      ['access_token', tokens.access_token],
      ['refresh_token', tokens.refresh_token],
      ['token_type', tokens.token_type],
    ])
  } catch (error)  {
    console.error('Error storing tokens:', error);
    throw error;
  }
}