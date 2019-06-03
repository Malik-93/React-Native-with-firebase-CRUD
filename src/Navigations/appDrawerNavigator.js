import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../Screens/HomeScreen';

const DrawerNavigator = createDrawerNavigator({ 
  HomeScreen, 
  })

export const AppDrawerNavigator = createAppContainer(DrawerNavigator)