import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Text, Footer, Button } from 'native-base';
import { Constants, Facebook } from 'expo';
import { firebaseAuth } from '../../../firebase';
import ResetPasswordModal from './ResetPasswordModal';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isAuthenticate: false,
            email: '',
            password: '',
            user: {},
            uId: '',
            isModalVisible: false
        };
    }
    _toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    handleLogin = () => {
        this.setState({ isLoading: true })
        const { email, password } = this.state
        firebaseAuth.signInWithEmailAndPassword(email, password)
            .then(res => {
                const dbUser = res.user
                if (dbUser) {
                    console.log('Logged In Successfully')
                    return this.setState({ user: dbUser, uId: dbUser.uid, email: null, password: null, isLoading: false }, () => this.props.navigation.navigate('ChatRoom'))
                }
            })
            .catch(err => alert(err))
    }
    resetPasswordHandle = () => {
        this.setState({ isLoading: true })
        const { email } = this.state
        firebaseAuth.sendPasswordResetEmail(email)
            .then(() => alert('Email link has been sent to your email:', email))
            .catch(err => alert('Error sending reset password link: ', err))
        setTimeout(() => {
            this.setState({ isLoading: false, isModalVisible: !this.state.isModalVisible })
        }, 7000);
    }

     facebookLoginHandle = async () => {
         this.setState({isLoading: true})
        const { type, token } = await Facebook.logInWithReadPermissionsAsync('1632939486838087', { permissions: ['public_profile'] })
        if (type === 'success') {
             const credentials = firebaseAuth.FacebookAuthProvider.credential(token)
             firebaseAuth.signInWithCredential(credentials)
             console.log('Fb Credentials:', credentials)
             this.setState({ isLoading: false }, () => this.props.navigation.navigate('ChatRoom'))
        } else {
             console.log('Facebook Login Error:' )
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
        return (
            <Container>
                <Header style={{ marginTop: Constants.statusBarHeight, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff' }}>Header</Text>
                </Header>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input
                                value={this.state.email}
                                onChangeText={email => this.setState({ email })}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input

                                value={this.state.password}
                                onChangeText={password => this.setState({ password })}
                            />
                        </Item>

                        <View style={{ marginTop: 20 }}>
                            <Button block onPress={this.handleLogin}>
                                <Text style={{ color: '#fff' }}>Login</Text>
                            </Button>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Button block onPress={this.facebookLoginHandle}>
                                <Text style={{ color: '#fff' }}>Login With Facebook</Text>
                            </Button>
                        </View>

                        <View style={{ marginTop: 25, justifyContent: 'center', flexDirection: 'row' }}>
                            <Text>
                                Forget Password?
                        </Text>
                            <TouchableOpacity
                                onPress={this._toggleModal}
                            >
                                <Text style={{ color: 'red', marginLeft: 10 }}>Reset Here</Text>
                            </TouchableOpacity>
                        </View>
                    </Form>
                    <View>
                        {this.state.isModalVisible ?
                            <ResetPasswordModal
                                visible={this.state.isModalVisible}
                                modalClose={this.resetPasswordHandle}
                                email={this.state.email}
                                onDismissModal={this._toggleModal}
                                onChangeEmail={email => this.setState({ email })}
                            /> : <Text>{" "}</Text>
                        }

                    </View>
                </Content>
                <Footer style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff' }}>Footer</Text>
                </Footer>
            </Container>
        );
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