import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { loginApi } from '../../../api/auth';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps, RootStackParamList } from '../../../types/navigation';
import { storeTokens } from '../../../utils/storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ApiError } from '../../../types/error';
import { useAuth } from '../../../contexts/AuthContext';

const LoginScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);

  const { setIsLoggedIn } = useAuth();

  const handleLogin = async () => {
    if (!clientId || !clientSecret) {
      Alert.alert('입력 정보가 올바르지 않습니다', '모든 필드를 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      const response = await loginApi({
        client_id: clientId,
        client_secret: clientSecret,
      });

      await storeTokens(response);
      setIsLoggedIn(true);
      navigation.replace('Home');
    } catch (error) {
      const apiError = error as ApiError;
      Alert.alert(
        '로그인 실패',
        apiError.response?.data?.message || '로그인에 실패했습니다.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <TextInput
        style={styles.input}
        placeholder="Client ID"
        value={clientId}
        onChangeText={setClientId}
        autoCapitalize="none"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Client Secret"
        value={clientSecret}
        onChangeText={setClientSecret}
        secureTextEntry
        autoCapitalize="none"
        editable={!loading}
      />
      <TouchableOpacity
        style={[styles.loginButton, loading && styles.loginButtonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>로그인</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
});

export default LoginScreen;
