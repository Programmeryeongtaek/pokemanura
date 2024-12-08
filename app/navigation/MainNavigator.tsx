import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home/HomeScreen';
import MetricsScreen from '../../screens/monitoring/MetricsScreen';
import StatusScreen from '../../screens/status/StatusScreen';
import ServiceListScreen from '../../screens/management/ServiceListScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                name="home"
                size={24}
                color={color}
                options={{ headerShown: false }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Monitoring"
          component={MetricsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="insert-chart" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Status"
          component={StatusScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="dns" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Management"
          component={ServiceListScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="settings" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
