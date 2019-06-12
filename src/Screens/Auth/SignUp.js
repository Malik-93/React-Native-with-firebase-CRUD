import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Text, Footer, Button } from 'native-base';
import { Constants } from 'expo';
import { firebaseAuth } from '../../../firebase';
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            fname: '',
            lname: '',
            email: '',
            password: '',
            confPassword: ''
        };
    }

    handleSignUp = () => {
        this.setState({ isLoading: true })

        const { fname, lname, email, password, confPassword } = this.state
        if (fname.length <= 0 || lname.length <= 0 || email.length <= 0) {
            alert('All Fields are required')
        } else if ((password || confPassword).length < 7) {
            alert('Password must be less than 7 characters')
        }
        else if (password !== confPassword) {
            return alert('Password match error')
        }
        else {
            firebaseAuth.createUserWithEmailAndPassword(email, password)
                .then(user => {
                    console.log('Sign up user:', user)
                    this.setState({
                        isLoading: false,
                        fname: '',
                        lname: '',
                        email: '',
                        password: '',
                        confPassword: ''
                    }, () => this.props.navigation.navigate('Login'))
                })
                .catch(error => console.log('Error during sign up:', error))
        }
        this.setState({
            isLoading: false,
            fname: '',
            lname: '',
            email: '',
            password: '',
            confPassword: ''
        })
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
                            <Label>First Name</Label>
                            <Input
                                value={this.state.fname}
                                onChangeText={fname => this.setState({ fname })}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Last Name</Label>
                            <Input
                                value={this.state.lname}
                                onChangeText={lname => this.setState({ lname })}
                            />
                        </Item>
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
                        <Item floatingLabel>
                            <Label>Confirm Password</Label>
                            <Input
                                value={this.state.confPassword}
                                onChangeText={confPassword => this.setState({ confPassword })}
                            />
                        </Item>
                        <View style={{ marginTop: 20 }}>
                            <Button block onPress={this.handleSignUp}>
                                <Text style={{ color: '#fff' }}>Sign Up</Text>
                            </Button>
                        </View>
                        <View style={{ marginTop: 25, justifyContent: 'center', flexDirection: 'row' }}>
                            <Text>
                                Have an Account?
                        </Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Login')}
                            >
                                <Text style={{ color: 'blue', marginLeft: 10 }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </Form>
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