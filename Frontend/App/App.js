import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './components/Home';
import RegisterScreen from './components/RegisterScreen';
import ProfessionalMainScreen from './components/navigation/ProfessionalTabs';
import CustomerMainScreen from './components/navigation/CustomerTabs';

//import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
     <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{
          headerStyle: { backgroundColor: '#d9d9d9' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center'
        }}>
          <Stack.Screen
            name='Home'
            component={Home}
            options={{
              headerTitle: () => (
                <Image
                  source={require('./assets/HM/logo.png')}
                  style={{ width: 220, height: 80, resizeMode: 'contain' }}
                />
              )
            }}
          />
          <Stack.Screen
            name='RegisterScreen'
            component={RegisterScreen}
            options={{ title: "Sign Up for Work Base" }}
          />
          <Stack.Screen
            name='ProfessionalMainScreen'
            component={ProfessionalMainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='CustomerMainScreen'
            component={CustomerMainScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    
  );
}
