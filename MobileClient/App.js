import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';

import { navigationRef } from './src/RootNavigation';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import Providers from './Providers';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Providers>
      <NavigationContainer ref={navigationRef}>
        <ResolveAuthScreen />
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Providers>
  );
}

