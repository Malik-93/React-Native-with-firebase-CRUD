import React from 'react'
import { View, Modal } from 'react-native';
import { Form, Item, Input, Label, Button, Text } from 'native-base';

export default ResetPassword = ({ visible, onDismissModal, email, onChangeEmail, modalClose}) => {
    return (
        <Modal
            visible={visible}
            onDismiss={onDismissModal}
            onRequestClose={onDismissModal}
        >
            <View style={{ flex: 1, height: 350, width: 270, marginTop: 105, alignSelf: 'center' }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 10 }}>

                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input
                                value={email}
                                onChangeText={onChangeEmail}
                            />
                        </Item>
                    </Form>
                    <View style={{ marginTop: 20 }}>
                        <Button block onPress = { modalClose }>
                            <Text style={{ color: '#fff' }}>Reset</Text>
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
