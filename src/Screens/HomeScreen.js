import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import MessageActions from './../Redux/Actions/message-actions';
import { connect } from 'react-redux';

class HomeScreen extends Component {

  state = {
      isLoading: false
  }
 
  render() {
    if(this.state.isLoading){
    return(
      <View style={styles.activity}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )   
    }
    return (
      <View  style={ styles.homeContainer }>
         <Text>Home Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});


const mapStateToProps = (state) => {
  return {
    messages: state.messageReducer.messageList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMessageToRedux: (message) => dispatch(MessageActions.addMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)


