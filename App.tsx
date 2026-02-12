import './global.css';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Choose from '@/screens/Choose';
import Profile from '@/screens/Profile';
import Wallpaper from '@/screens/Wallpaper';
import { WallpaperContext } from './src/context/WallpaperContext'
import Todo from '@/screens/Todo';
enableScreens();

const Stack = createNativeStackNavigator();

export default function App() {

  return (

    <WallpaperContext>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Choose"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="Wallpaper"
              component={Wallpaper}
              options={{ title: 'Wallpaper' }}
            />
            <Stack.Screen
              name="Choose"
              component={Choose}
              options={{ title: 'Choose' }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ title: 'Profile' }}
            />
             <Stack.Screen
              name="Todo"
              component={Todo}
              options={{ title: 'Todo' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
    </WallpaperContext>
  );
}
