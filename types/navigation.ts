import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export interface RootStackParamList extends ParamListBase {
  Login: undefined;
  Home: undefined;
}

export interface NavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
}