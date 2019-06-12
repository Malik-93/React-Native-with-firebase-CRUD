import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import Login from '../Screens/Auth/LogIn';
import ChatRoom from './../Screens/Chat-room';
import SignUp from '../Screens/Auth/SignUp';

const DrawerNavigator = createDrawerNavigator({ 
  SignUp, 
  Login,
  ChatRoom,
  })

export const AppDrawerNavigator = createAppContainer(DrawerNavigator)