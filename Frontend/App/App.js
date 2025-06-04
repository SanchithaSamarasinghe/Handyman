import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './components/Home';
import ProfileTap from './components/ProfileTap';
import UpdateStudent from './components/UpdateStudent';
import AddStudent from './components/AddStudent';
//import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='home' screenOptions={
          {
            headerStyle: { backgroundColor: '#d9d9d9' },
            headerTintColor:'#ffff', 
            headerTitleAlign:'center'
        }}>
          <Stack.Screen 
            name='home' 
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
          
          <Stack.Screen name='profiletap' component={ProfileTap} options={{ title: "Student Health Profile" }} />
          <Stack.Screen name='UpdateStudent' component={UpdateStudent} options={{ title: "Student update Profile" }} />
          <Stack.Screen name='AddStudent' component={AddStudent} options={{ title: "Student Add Profile" }} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    
  );
}
