import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigator from './app/navigation/MainNavigator';
import { AuthProvider } from './contexts/AuthContext';
import { RootStackParamList } from './types/navigation';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './app/screens/home/HomeScreen';
import LoginScreen from './app/screens/home/LoginScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}
