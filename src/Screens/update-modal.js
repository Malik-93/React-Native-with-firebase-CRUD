import React from 'react'
import { View, Modal } from 'react-native';
import { Form, Item, Input, Label, Button, Text } from 'native-base';

export default UpdateModal = (props) => {
    const myState = props.siblingState
    return (
        <Modal 
        visible = { props.visible }
            onDismiss = { props.onDismissModal }
            onRequestClose = { props.onDismissModal }
        >
            <View style={{ flex: 1, height: 350, width: 270, marginTop: 105, alignSelf: 'center' }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 10 }}>

                    <Form>
                        <Item floatingLabel>
                            <Label>Name</Label>
                            <Input
                                value = { myState.name }
                                onChangeText={props.onChangeName }
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Message</Label>
                            <Input
                                value = { myState.message}
                                onChangeText={props.onChangeMessage }
                            />
                        </Item>
                    </Form>
                    <View style={{ marginTop: 20 }}>
                        <Button block onPress = { props.updateRecord }>
                            <Text style={{ color: '#fff' }}>Done</Text>
                        </Button>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Button block onPress = { props.onDismissModal }>
                            <Text style={{ color: '#fff' }}>Close Modal</Text>
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
