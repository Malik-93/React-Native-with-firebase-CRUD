import React from 'react';
import { StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import { Font, AppLoading } from 'expo';
import { Provider } from "react-redux";
import { store } from './src/Redux/store';
import { AppDrawerNavigator } from './src/Navigations/appDrawerNavigator';

// const highestTimeoutId = setTimeout(() => ';');
// console.log('Clearing issue') 
// for (let i = 0; i < highestTimeoutId; i++) {
//   clearTimeout(i);
// }

export default class App extends React.Component {
  state = {
    isFontLoaded: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({isFontLoaded: true})
  }

  render() {
    if( this.state.isFontLoaded ) {
      console.log('Fonts are loaded now')
      return (
          <Provider store={store}>
         <AppDrawerNavigator />
          </Provider>
      );
    } else {
           console.log('App is loading font')
            return <AppLoading />
    }
  }
}

const styles = StyleSheet.create({
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})