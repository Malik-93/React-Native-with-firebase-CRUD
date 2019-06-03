import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { EvilIcons, Feather } from '@expo/vector-icons'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, List, ListItem } from 'native-base';
import { db } from '../../firebase';
import UpdateModal from './update-modal';

export default class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      isLoading: false,
      isModalVisible: false,
      name: '',
      message: '',
      updateId: ''
    }
  }

  componentDidMount() {
    this.getRecord()
  }
  
  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }
  _openModal = (id) => {
    this.setState({ isModalVisible: !this.state.isModalVisible, updateId: id })
  }

  handleChangeName = (name) => {
    this.setState({ name })
  }

  handleChangeMessage = (message) => {
    this.setState({ message })
  }

  addRecord = () => {
    this.setState({ isLoading: true })
    const data = {
      name: this.state.name,
      message: this.state.message,
    }
    db.collection('Chats').add(data)
      .then(rec => console.log('Record Saved successfully: ', rec.data()))
      .catch(err => console.log('Error adding new record: ', err))
       this.setState({ isLoading: false })

    //Transactions

    // const docRef = db.collection('Chats').doc('Messages')
    // docRef.set({
    //   name: this.state.name,
    //   message: this.state.message,
    //   timestamp: fieldValue.serverTimestamp()
    // })
    // db.runTransaction(t => {
    //   return t.get(docRef)
    //   .then(doc => {
    //     const newMessage = doc.data().message +' '+'from faisalabad'
    //     t.update(docRef, { message: newMessage })
    //   })
    // })
    // .then(result => console.log( 'Transaction Success!', result ))
    // .catch(err => console.log( 'Error: ', err ))


    //updating document with timestamps

    // db.collection('Chats').doc('Messages').update({
    //   lname: 'Ali Raza',
    //   timestamp: fieldValue.serverTimestamp()
    // })
    // .then(() => console.log('Data Updated with timestamps in DB Successfully: ' ))
    // .catch(err => console.log('Error: ', err))
  }

  getRecord = () => {
    //Event Listner
    db.collection('Chats').onSnapshot(snapshot => {
      const data = []
      snapshot.forEach(doc => {
        const { name, message } = doc.data()
        data.push({
          _id: doc.id,
          name,
          message
        })
      })
      this.setState({
        messageList: data,
      })
    })
    // this.setState(prevState => {
    //   const data = prevState.messageList.concat(doc.data(), { _id: doc.id } )
    //   return {
    //     messageList: data,
    //   }
    // })

    // db.collection('Chats').get().then((snapshot) => {
    //   snapshot.forEach(doc => {
    //     this.setState({ messageList: [doc.data()] })
    //   })
    // })
    //   .catch(err => console.log('Error/*/*/*: ', err))
  }

  handleUpdate = () => {
    this.setState({isLoading: true})
    const updateMessaeg = {
      name: this.state.name,
      message: this.state.message
    }
    db.collection('Chats').doc(this.state.updateId).update(updateMessaeg)
    .then( () => console.log( 'Record has been updated'))
    .catch(err => console.log('Updating record Error :', err))
     this.setState({ isLoading: false })
     this._toggleModal()
  }

  handleDelete = (id) => {
    this.setState({isLoading: true})
    db.collection("Chats").doc(id).delete()
    .then(rec => console.log('Record Deleted!:', rec))
    .catch(err => console.log('Error record Deleting:', err))
    this.setState({isLoading: false})
  }

  render() {
    if(this.state.isLoading){
      return (
      <View style={styles.activity}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
      )
    }
    return (
      <Container>
        <Header />
        <Content style={{ flex: 1 }}>
          <View>
            <Form>
              <Item floatingLabel>
                <Label>Name</Label>
                <Input
                  value={this.state.name}
                  onChangeText={this.handleChangeName}
                />
              </Item>
              <Item floatingLabel last>
                <Label>Message</Label>
                <Input
                  value={this.state.message}
                  onChangeText={this.handleChangeMessage}
                />
              </Item>
            </Form>
            <View style={{ marginTop: 20 }}>
              <Button block onPress={this.addRecord}>
                <Text style={{ color: '#fff' }}>Send</Text>
              </Button>
            </View>
          </View>
          <View style={{ flex: 1, borderWidth: 1, borderStyle: 'solid', marginTop: 10 }}>
            <View>
              {this.state.messageList.length >= 0 ?
                <List >
                  {
                    this.state.messageList.map((msg, index) => {
                      return (
                        <ListItem style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'nowrap' }} key={index}>
                          <Text>{msg.name}</Text>
                          <Text>{msg.message}</Text>
                          <TouchableOpacity
                            onPress = { () => this._openModal(msg._id) }
                          >
                            <Feather name='edit' size={20} />
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => this.handleDelete(msg._id)}
                          >
                            <EvilIcons name='trash' size={25} />
                          </TouchableOpacity>
                        </ListItem>
                      )
                    })}
                </List>
                : <Text>{" "}</Text>}
              <View>
                {
                  this.state.isModalVisible ?
                    <UpdateModal
                      visible = { this.state.isModalVisible }
                      onDismissModal = { this._toggleModal }
                      siblingState = { this.state }
                      onChangeName = {this.handleChangeName }
                      onChangeMessage = { this.handleChangeMessage }
                      closeModal = { this._toggleModal }
                      updateRecord = { this.handleUpdate }

                    /> : <Text>{" "}</Text>}
              </View>
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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



// addMessage = () => {
//     const data = {
//         name: this.state.name,
//         message: this.state.message
//     }
//    firebase.database().ref('messages').push().set({data},
//     (err) => {
//         if(err) {
//             console.log('Error: ', err)
//         }
//         return console.log('Message added successfully')
//     })
// }

// getMessages = () => {
//     let messagesRef = firebase.database().ref('messages')
//     messagesRef.once('value', (snapshot) => {
//     const data = snapshot.val();

//   if( data ) {
//   const initMessage = []
//   Object.keys(data).forEach((message) => initMessage.push(data[message]))
//   this.setState({ messageList: initMessage })
//   }
//     })

//     firebase.database().ref('messages').on('child_added', (snapshot) => {
//         const data = snapshot.val();
//         if (data) {
//             this.setState((prevState) => ({
//                 messageList: [data, ...prevState.messageList]
//             }))
//         }
//     })
// }