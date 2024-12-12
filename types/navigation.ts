import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export interface RootStackParamList extends ParamListBase {
  HomeMain: undefined;
  Home: undefined;
  Monitoring: undefined;
  Status: undefined;
  Management: undefined;
  Login: undefined;
}

export interface NavigationProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
}