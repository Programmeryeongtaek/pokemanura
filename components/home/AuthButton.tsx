import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface AuthButtonProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  isLoggedIn,
  onLogout,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        if (isLoggedIn && onLogout) {
          onLogout();
        } else {
          navigation.navigate('Login');
        }
      }}
    >
      <Text style={styles.buttonText}>
        {isLoggedIn ? '로그아웃' : '로그인'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
  buttonText: {
    color: '#007AFF',
    fontSize: 16,
  },
});
